const LEGACY_PROFILE_ID = "tymon";
const ADMIN_EMAIL = "damianolbrys5@gmail.com";
const LEGACY_SYNC_CODE_HASH = "d559a4532fd762e10225cf57ba915b413647cd6083ecaa4b99343dc41928fe83";
const SUBJECT_KEYS = ["math", "polish", "english", "world", "logic", "reading", "coding"];
const HISTORY_DAYS_LIMIT = 365;
const MAX_PROGRESS_BYTES = 450_000;

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, OPTIONS",
  "access-control-allow-headers": "authorization, content-type"
};

let googleKeyCache = { expiresAt: 0, keys: [] };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS?.fetch ? env.ASSETS.fetch(request) : json({ error: "Nie znaleziono strony." }, 404);
    }

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: JSON_HEADERS });

    try {
      if (url.pathname === "/api/config" && request.method === "GET") {
        return json({
          googleClientId: String(env.GOOGLE_CLIENT_ID || ""),
          authEnabled: Boolean(env.GOOGLE_CLIENT_ID)
        });
      }

      if (!env.DB) return json({ error: "Baza danych nie jest jeszcze podłączona." }, 503);
      await ensureSchema(env.DB);

      if (url.pathname === "/api/auth/google" && request.method === "POST") {
        return await handleGoogleLogin(request, env);
      }

      if (url.pathname === "/api/session" && request.method === "GET") {
        const auth = await authenticate(request, env);
        if (auth.kind !== "user") return json({ error: "Ta metoda wymaga konta Google." }, 401);
        return json({ user: publicUser(auth.user) });
      }

      if (url.pathname === "/api/logout" && request.method === "POST") {
        const token = bearerToken(request);
        if (token) await env.DB.prepare("DELETE FROM auth_sessions WHERE token_hash = ?").bind(await sha256(token)).run();
        return json({ ok: true });
      }

      if (url.pathname === "/api/progress") {
        return await handleProgress(request, env);
      }

      if (url.pathname === "/api/admin/users" && request.method === "GET") {
        const auth = await requireAdmin(request, env);
        if (auth instanceof Response) return auth;
        const result = await env.DB.prepare(`
          SELECT u.id, u.email, u.name, u.picture, u.role, u.status,
                 u.created_at, u.last_login_at, u.approved_at, p.updated_at AS progress_updated_at
          FROM users u
          LEFT JOIN user_progress p ON p.user_id = u.id
          ORDER BY CASE u.status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
                   u.created_at DESC
        `).all();
        return json({ users: (result.results || []).map(publicAdminUser) });
      }

      const statusMatch = url.pathname.match(/^\/api\/admin\/users\/(\d+)\/status$/);
      if (statusMatch && request.method === "PUT") {
        const auth = await requireAdmin(request, env);
        if (auth instanceof Response) return auth;
        const userId = Number(statusMatch[1]);
        const payload = await request.json().catch(() => null);
        const action = payload?.action;
        const target = await env.DB.prepare("SELECT id, email, role, status FROM users WHERE id = ?").bind(userId).first();
        if (!target) return json({ error: "Nie znaleziono użytkownika." }, 404);
        if (String(target.email).toLowerCase() === ADMIN_EMAIL) return json({ error: "Nie można zmienić konta głównego administratora." }, 400);

        if (action === "approve") {
          await env.DB.prepare(`
            UPDATE users SET status = 'approved', approved_at = datetime('now'), approved_by = ? WHERE id = ?
          `).bind(auth.user.id, userId).run();
        } else if (action === "ban") {
          await env.DB.prepare("UPDATE users SET status = 'banned' WHERE id = ?").bind(userId).run();
          await env.DB.prepare("DELETE FROM auth_sessions WHERE user_id = ?").bind(userId).run();
        } else {
          return json({ error: "Nieznana operacja administratora." }, 400);
        }
        return json({ ok: true });
      }

      return json({ error: "Nie znaleziono endpointu." }, 404);
    } catch (error) {
      if (error?.status) return json({ error: error.message }, error.status);
      console.error("TymoMoc API error", error);
      return json({ error: "Serwer TymoMocy napotkał błąd. Spróbuj ponownie." }, 500);
    }
  }
};

async function handleGoogleLogin(request, env) {
  if (!env.GOOGLE_CLIENT_ID) return json({ error: "Logowanie Google nie zostało jeszcze skonfigurowane." }, 503);
  if (!isAllowedLoginOrigin(request.headers.get("origin"), env.APP_ORIGIN)) {
    return json({ error: "Logowanie z tej strony nie jest dozwolone." }, 403);
  }

  const payload = await request.json().catch(() => null);
  const credential = String(payload?.credential || "");
  if (!credential) return json({ error: "Brakuje potwierdzenia z Google." }, 400);

  const profile = typeof env.GOOGLE_TOKEN_VERIFIER === "function"
    ? await env.GOOGLE_TOKEN_VERIFIER(credential, env.GOOGLE_CLIENT_ID)
    : await verifyGoogleCredential(credential, env.GOOGLE_CLIENT_ID);
  if (!profile?.sub || !profile?.email || profile.email_verified !== true) {
    return json({ error: "Google nie potwierdził tego adresu e-mail." }, 401);
  }
  if (!String(profile.email).toLowerCase().endsWith("@gmail.com")) {
    return json({ error: "TymoMoc przyjmuje obecnie konta Gmail." }, 403);
  }

  const email = String(profile.email).toLowerCase();
  const isAdmin = email === ADMIN_EMAIL;
  await env.DB.prepare(`
    INSERT INTO users (google_sub, email, name, picture, role, status, approved_at, last_login_at)
    VALUES (?, ?, ?, ?, ?, ?, CASE WHEN ? = 'approved' THEN datetime('now') ELSE NULL END, datetime('now'))
    ON CONFLICT(google_sub) DO UPDATE SET
      email = excluded.email,
      name = excluded.name,
      picture = excluded.picture,
      last_login_at = datetime('now'),
      role = CASE WHEN excluded.email = ? THEN 'admin' ELSE users.role END,
      status = CASE WHEN excluded.email = ? THEN 'approved' ELSE users.status END
  `).bind(
    String(profile.sub), email, String(profile.name || ""), String(profile.picture || ""),
    isAdmin ? "admin" : "user", isAdmin ? "approved" : "pending", isAdmin ? "approved" : "pending",
    ADMIN_EMAIL, ADMIN_EMAIL
  ).run();

  const user = await env.DB.prepare("SELECT * FROM users WHERE google_sub = ?").bind(String(profile.sub)).first();
  if (!user) return json({ error: "Nie udało się utworzyć konta." }, 500);
  if (user.status === "banned") return json({ error: "To konto zostało zablokowane przez administratora." }, 403);

  const token = randomToken();
  await env.DB.prepare(`
    INSERT INTO auth_sessions (token_hash, user_id, expires_at)
    VALUES (?, ?, datetime('now', '+30 days'))
  `).bind(await sha256(token), user.id).run();

  return json({ token, user: publicUser(user) });
}

async function handleProgress(request, env) {
  const auth = await authenticate(request, env);
  if (auth.kind === "user" && !["approved"].includes(auth.user.status) && auth.user.role !== "admin") {
    return json({ error: "Konto czeka na akceptację administratora." }, 403);
  }

  if (request.method === "GET") {
    const row = auth.kind === "user"
      ? await env.DB.prepare("SELECT progress_json, updated_at FROM user_progress WHERE user_id = ?").bind(auth.user.id).first()
      : await env.DB.prepare("SELECT progress_json, updated_at FROM player_progress WHERE profile_id = ?").bind(LEGACY_PROFILE_ID).first();
    if (!row) return json({ progress: null, updatedAt: null });
    return json({ progress: JSON.parse(row.progress_json), updatedAt: row.updated_at });
  }

  if (request.method === "PUT") {
    const payload = await request.json().catch(() => null);
    const progress = normalizeProgress(payload?.progress);
    if (!progress) return json({ error: "Nieprawidłowy format wyników." }, 400);
    const encoded = JSON.stringify(progress);
    if (new TextEncoder().encode(encoded).length > MAX_PROGRESS_BYTES) return json({ error: "Historia jest zbyt duża." }, 413);

    if (auth.kind === "user") {
      await env.DB.prepare(`
        INSERT INTO user_progress (user_id, progress_json, updated_at)
        VALUES (?, ?, datetime('now'))
        ON CONFLICT(user_id) DO UPDATE SET progress_json = excluded.progress_json, updated_at = datetime('now')
      `).bind(auth.user.id, encoded).run();
    } else {
      await env.DB.prepare(`
        INSERT INTO player_progress (profile_id, progress_json, updated_at)
        VALUES (?, ?, datetime('now'))
        ON CONFLICT(profile_id) DO UPDATE SET progress_json = excluded.progress_json, updated_at = datetime('now')
      `).bind(LEGACY_PROFILE_ID, encoded).run();
    }
    return json({ ok: true });
  }

  return json({ error: "Niedozwolona metoda." }, 405, { allow: "GET, PUT" });
}

async function authenticate(request, env) {
  const token = bearerToken(request);
  if (!token) throw httpError(401, "Zaloguj się lub podaj rodzinny kod synchronizacji.");

  const session = await env.DB.prepare(`
    SELECT u.* FROM auth_sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > datetime('now')
  `).bind(await sha256(token)).first();
  if (session) {
    if (session.status === "banned") throw httpError(403, "To konto zostało zablokowane.");
    return { kind: "user", user: session };
  }

  const normalizedCode = token.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const expectedHash = String(env.SYNC_CODE_HASH || LEGACY_SYNC_CODE_HASH);
  if (normalizedCode && timingSafeEqual(await sha256(normalizedCode), expectedHash)) return { kind: "legacy" };
  throw httpError(401, "Sesja wygasła albo kod synchronizacji jest nieprawidłowy.");
}

async function requireAdmin(request, env) {
  try {
    const auth = await authenticate(request, env);
    if (auth.kind !== "user" || auth.user.role !== "admin" || auth.user.status !== "approved") {
      return json({ error: "Brak uprawnień administratora." }, 403);
    }
    return auth;
  } catch (error) {
    return json({ error: error.message }, error.status || 401);
  }
}

function bearerToken(request) {
  return (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
}

function publicUser(user) {
  return {
    id: Number(user.id),
    email: String(user.email),
    name: String(user.name || ""),
    picture: String(user.picture || ""),
    role: String(user.role),
    status: String(user.status)
  };
}

function publicAdminUser(user) {
  return {
    ...publicUser(user),
    createdAt: user.created_at,
    lastLoginAt: user.last_login_at,
    approvedAt: user.approved_at,
    progressUpdatedAt: user.progress_updated_at
  };
}

function isAllowedLoginOrigin(origin, configuredOrigin) {
  if (!origin) return false;
  if (configuredOrigin && origin === configuredOrigin) return true;
  try {
    const url = new URL(origin);
    return url.protocol === "https:" && (
      url.hostname === "tymomoc2.damianolbrys5.workers.dev"
      || /^[-a-f0-9]+-tymomoc2\.damianolbrys5\.workers\.dev$/.test(url.hostname)
    );
  } catch {
    return false;
  }
}

async function verifyGoogleCredential(token, clientId) {
  const parts = token.split(".");
  if (parts.length !== 3) throw httpError(401, "Nieprawidłowy identyfikator Google.");
  const header = JSON.parse(decodeBase64UrlText(parts[0]));
  const payload = JSON.parse(decodeBase64UrlText(parts[1]));
  if (header.alg !== "RS256" || !header.kid) throw httpError(401, "Nieobsługiwany podpis Google.");

  const keys = await googlePublicKeys();
  const jwk = keys.find((key) => key.kid === header.kid);
  if (!jwk) throw httpError(401, "Nie znaleziono klucza podpisu Google.");
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    decodeBase64UrlBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  );
  if (!valid) throw httpError(401, "Podpis Google jest nieprawidłowy.");

  const now = Math.floor(Date.now() / 1000);
  const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!audiences.includes(clientId)) throw httpError(401, "Token Google jest przeznaczony dla innej aplikacji.");
  if (!["accounts.google.com", "https://accounts.google.com"].includes(payload.iss)) throw httpError(401, "Nieprawidłowy wystawca tokenu.");
  if (!Number(payload.exp) || payload.exp <= now) throw httpError(401, "Token Google wygasł.");
  return payload;
}

async function googlePublicKeys() {
  if (googleKeyCache.expiresAt > Date.now() && googleKeyCache.keys.length) return googleKeyCache.keys;
  const response = await fetch("https://www.googleapis.com/oauth2/v3/certs", { cf: { cacheTtl: 3000, cacheEverything: true } });
  if (!response.ok) throw httpError(503, "Nie udało się pobrać kluczy Google.");
  const payload = await response.json();
  const cacheControl = response.headers.get("cache-control") || "";
  const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1] || 3000);
  googleKeyCache = { keys: payload.keys || [], expiresAt: Date.now() + Math.max(300, maxAge - 60) * 1000 };
  return googleKeyCache.keys;
}

function decodeBase64UrlBytes(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(normalized);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function decodeBase64UrlText(value) {
  return new TextDecoder().decode(decodeBase64UrlBytes(value));
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value)));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

function normalizeProgress(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const result = {};
  for (const level of ["8", "9"]) {
    const source = value[level];
    if (!source || typeof source !== "object" || Array.isArray(source)) return null;
    const date = typeof source.today?.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(source.today.date)
      ? source.today.date
      : new Date().toISOString().slice(0, 10);
    const categories = {};
    for (const subject of SUBJECT_KEYS) {
      const category = source.categories?.[subject] || {};
      categories[subject] = {
        xp: safeInteger(category.xp), correct: safeInteger(category.correct),
        wrong: safeInteger(category.wrong), completed: safeInteger(category.completed)
      };
    }
    result[level] = {
      xp: safeInteger(source.xp), streak: safeInteger(source.streak), completed: safeInteger(source.completed),
      correct: safeInteger(source.correct), today: { date, count: safeInteger(source.today?.count) },
      categories, history: normalizeHistory(source.history)
    };
  }
  return result;
}

function normalizeHistory(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const dates = Object.keys(value).filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)).sort().slice(-HISTORY_DAYS_LIMIT);
  const result = {};
  for (const date of dates) {
    const categories = {};
    for (const subject of SUBJECT_KEYS) {
      const entry = value[date]?.[subject];
      if (!entry || typeof entry !== "object") continue;
      const normalized = {
        xp: safeInteger(entry.xp), correct: safeInteger(entry.correct), wrong: safeInteger(entry.wrong),
        missions: safeInteger(entry.missions), questions: safeInteger(entry.questions)
      };
      if (Object.values(normalized).some(Boolean)) categories[subject] = normalized;
    }
    if (Object.keys(categories).length) result[date] = categories;
  }
  return result;
}

function safeInteger(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(Math.max(Math.trunc(number), 0), 1_000_000_000);
}

async function ensureSchema(db) {
  const statements = [
    `CREATE TABLE IF NOT EXISTS player_progress (profile_id TEXT PRIMARY KEY, progress_json TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, google_sub TEXT NOT NULL UNIQUE, email TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', picture TEXT NOT NULL DEFAULT '', role TEXT NOT NULL DEFAULT 'user', status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL DEFAULT (datetime('now')), last_login_at TEXT NOT NULL DEFAULT (datetime('now')), approved_at TEXT, approved_by INTEGER)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users(lower(email))`,
    `CREATE TABLE IF NOT EXISTS auth_sessions (token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')), expires_at TEXT NOT NULL)`,
    `CREATE INDEX IF NOT EXISTS auth_sessions_user_idx ON auth_sessions(user_id)`,
    `CREATE TABLE IF NOT EXISTS user_progress (user_id INTEGER PRIMARY KEY, progress_json TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))`
  ];
  for (const statement of statements) await db.prepare(statement).run();
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...JSON_HEADERS, ...extraHeaders } });
}

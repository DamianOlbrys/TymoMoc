const PROFILE_ID = "tymon";
const SYNC_CODE_HASH = "d559a4532fd762e10225cf57ba915b413647cd6083ecaa4b99343dc41928fe83";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, PUT, OPTIONS",
  "access-control-allow-headers": "authorization, content-type"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    if (url.pathname !== "/api/progress") {
      return json({ error: "Nie znaleziono endpointu." }, 404);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: JSON_HEADERS });
    }

    if (!(await isAuthorized(request, env.SYNC_CODE_HASH || SYNC_CODE_HASH))) {
      return json({ error: "Nieprawidłowy kod synchronizacji." }, 401);
    }

    if (!env.DB) {
      return json({ error: "Baza danych nie jest jeszcze podłączona." }, 503);
    }

    try {
      await ensureSchema(env.DB);

      if (request.method === "GET") {
        const row = await env.DB
          .prepare("SELECT progress_json, updated_at FROM player_progress WHERE profile_id = ?")
          .bind(PROFILE_ID)
          .first();

        if (!row) return json({ progress: null, updatedAt: null });

        return json({
          progress: JSON.parse(row.progress_json),
          updatedAt: row.updated_at
        });
      }

      if (request.method === "PUT") {
        const payload = await request.json().catch(() => null);
        const progress = normalizeProgress(payload?.progress);
        if (!progress) return json({ error: "Nieprawidłowy format wyników." }, 400);

        const encoded = JSON.stringify(progress);
        if (encoded.length > 20_000) return json({ error: "Dane są zbyt duże." }, 413);

        await env.DB
          .prepare(`
            INSERT INTO player_progress (profile_id, progress_json, updated_at)
            VALUES (?, ?, datetime('now'))
            ON CONFLICT(profile_id) DO UPDATE SET
              progress_json = excluded.progress_json,
              updated_at = datetime('now')
          `)
          .bind(PROFILE_ID, encoded)
          .run();

        return json({ ok: true });
      }

      return json({ error: "Niedozwolona metoda." }, 405, { allow: "GET, PUT" });
    } catch (error) {
      console.error("TymoMoc D1 error", error);
      return json({ error: "Nie udało się zapisać wyników. Spróbuj ponownie." }, 500);
    }
  }
};

async function ensureSchema(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS player_progress (
      profile_id TEXT PRIMARY KEY,
      progress_json TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();
}

async function isAuthorized(request, expectedHash) {
  const authorization = request.headers.get("authorization") || "";
  const code = authorization.replace(/^Bearer\s+/i, "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!code) return false;

  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(code));
  const candidate = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return timingSafeEqual(candidate, expectedHash);
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
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

    result[level] = {
      xp: safeInteger(source.xp),
      streak: safeInteger(source.streak),
      completed: safeInteger(source.completed),
      correct: safeInteger(source.correct),
      today: { date, count: safeInteger(source.today?.count) }
    };
  }

  return result;
}

function safeInteger(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(Math.max(Math.trunc(number), 0), 1_000_000_000);
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders }
  });
}

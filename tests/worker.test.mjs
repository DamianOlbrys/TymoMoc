import assert from "node:assert/strict";
import worker from "../src/index.js";

class MemoryD1 {
  constructor() {
    this.legacyProgress = null;
    this.userProgress = new Map();
    this.users = [];
    this.sessions = new Map();
    this.nextUserId = 1;
  }

  prepare(sql) {
    const database = this;
    const compact = sql.replace(/\s+/g, " ").trim();
    let values = [];
    return {
      bind(...nextValues) { values = nextValues; return this; },
      async run() {
        if (compact.includes("INSERT INTO player_progress")) {
          database.legacyProgress = { profile_id: values[0], progress_json: values[1], updated_at: "2026-07-19 12:00:00" };
        } else if (compact.includes("INSERT INTO user_progress")) {
          database.userProgress.set(Number(values[0]), { progress_json: values[1], updated_at: "2026-07-19 13:00:00" });
        } else if (compact.includes("INSERT INTO users")) {
          let user = database.users.find((item) => item.google_sub === values[0]);
          if (!user) {
            user = {
              id: database.nextUserId++, google_sub: values[0], email: values[1], name: values[2], picture: values[3],
              role: values[4], status: values[5], created_at: "2026-07-19 10:00:00", last_login_at: "2026-07-19 10:00:00",
              approved_at: values[5] === "approved" ? "2026-07-19 10:00:00" : null
            };
            database.users.push(user);
          } else {
            user.email = values[1]; user.name = values[2]; user.picture = values[3]; user.last_login_at = "2026-07-19 11:00:00";
            if (values[1] === "damianolbrys5@gmail.com") { user.role = "admin"; user.status = "approved"; }
          }
        } else if (compact.includes("INSERT INTO auth_sessions")) {
          database.sessions.set(values[0], Number(values[1]));
        } else if (compact.includes("UPDATE users SET status = 'approved'")) {
          const user = database.users.find((item) => item.id === Number(values[1]));
          if (user) { user.status = "approved"; user.approved_at = "2026-07-19 12:30:00"; }
        } else if (compact.includes("UPDATE users SET status = 'banned'")) {
          const user = database.users.find((item) => item.id === Number(values[0]));
          if (user) user.status = "banned";
        } else if (compact.includes("DELETE FROM auth_sessions WHERE user_id")) {
          for (const [hash, id] of database.sessions) if (id === Number(values[0])) database.sessions.delete(hash);
        } else if (compact.includes("DELETE FROM auth_sessions WHERE token_hash")) {
          database.sessions.delete(values[0]);
        }
        return { success: true };
      },
      async first() {
        if (compact.includes("FROM auth_sessions s")) {
          const userId = database.sessions.get(values[0]);
          return database.users.find((item) => item.id === userId) || null;
        }
        if (compact.includes("FROM player_progress")) return database.legacyProgress;
        if (compact.includes("FROM user_progress")) return database.userProgress.get(Number(values[0])) || null;
        if (compact.includes("WHERE google_sub = ?")) return database.users.find((item) => item.google_sub === values[0]) || null;
        if (compact.includes("SELECT id, email, role, status FROM users")) {
          const user = database.users.find((item) => item.id === Number(values[0]));
          return user ? { id: user.id, email: user.email, role: user.role, status: user.status } : null;
        }
        return null;
      },
      async all() {
        if (!compact.includes("FROM users u")) return { results: [] };
        return { results: database.users.map((user) => ({ ...user, progress_updated_at: database.userProgress.get(user.id)?.updated_at || null })) };
      }
    };
  }
}

const progress = {
  8: {
    xp: 120, streak: 3, completed: 4, correct: 17, today: { date: "2026-07-19", count: 2 },
    categories: { math: { xp: 75, correct: 5, wrong: 0, completed: 1 } },
    history: { "2026-07-19": { math: { xp: 75, correct: 5, wrong: 0, missions: 1, questions: 5 } } }
  },
  9: {
    xp: 10, streak: 1, completed: 1, correct: 1, today: { date: "2026-07-19", count: 1 },
    categories: { coding: { xp: 7, correct: 0, wrong: 1, completed: 0 } }, history: {}
  }
};

const database = new MemoryD1();
const env = {
  DB: database,
  ASSETS: { fetch: async () => new Response("asset") },
  SYNC_CODE_HASH: "c51fd0b24b0e48c5db2cf05afebdb7fcc97ae5de5933841e0e0ed1f0f654cfc7",
  GOOGLE_CLIENT_ID: "test-client.apps.googleusercontent.com",
  GOOGLE_TOKEN_VERIFIER: async (credential) => credential === "admin-token"
    ? { sub: "google-admin", email: "damianolbrys5@gmail.com", email_verified: true, name: "Damian", picture: "" }
    : { sub: "google-child", email: "parent.test@gmail.com", email_verified: true, name: "Rodzic", picture: "" }
};
const legacyHeaders = { authorization: "Bearer TEST-CODE" };

const config = await worker.fetch(new Request("https://example.test/api/config"), env);
assert.equal(config.status, 200);
assert.equal((await config.json()).authEnabled, true);

const preflight = await worker.fetch(new Request("https://example.test/api/progress", { method: "OPTIONS" }), env);
assert.equal(preflight.status, 204);
assert.equal(preflight.headers.get("access-control-allow-origin"), "*");

const unauthorized = await worker.fetch(new Request("https://example.test/api/progress"), env);
assert.equal(unauthorized.status, 401);

const saved = await worker.fetch(new Request("https://example.test/api/progress", {
  method: "PUT", headers: { ...legacyHeaders, "content-type": "application/json" }, body: JSON.stringify({ progress })
}), env);
assert.equal(saved.status, 200);

const loaded = await worker.fetch(new Request("https://example.test/api/progress", { headers: legacyHeaders }), env);
const loadedProgress = (await loaded.json()).progress;
assert.deepEqual(loadedProgress["8"].history, progress[8].history);
assert.equal(Object.keys(loadedProgress["8"].categories).length, 7);

const childLogin = await worker.fetch(new Request("https://example.test/api/auth/google", {
  method: "POST", headers: { origin: "https://tymomoc2.damianolbrys5.workers.dev", "content-type": "application/json" },
  body: JSON.stringify({ credential: "child-token" })
}), env);
assert.equal(childLogin.status, 200);
const childPayload = await childLogin.json();
assert.equal(childPayload.user.status, "pending");

const pendingProgress = await worker.fetch(new Request("https://example.test/api/progress", { headers: { authorization: `Bearer ${childPayload.token}` } }), env);
assert.equal(pendingProgress.status, 403);

const adminLogin = await worker.fetch(new Request("https://example.test/api/auth/google", {
  method: "POST", headers: { origin: "https://tymomoc2.damianolbrys5.workers.dev", "content-type": "application/json" },
  body: JSON.stringify({ credential: "admin-token" })
}), env);
const adminPayload = await adminLogin.json();
assert.equal(adminPayload.user.role, "admin");
assert.equal(adminPayload.user.status, "approved");

const adminHeaders = { authorization: `Bearer ${adminPayload.token}`, "content-type": "application/json" };
const usersBefore = await worker.fetch(new Request("https://example.test/api/admin/users", { headers: adminHeaders }), env);
assert.equal((await usersBefore.json()).users.length, 2);

const approve = await worker.fetch(new Request(`https://example.test/api/admin/users/${childPayload.user.id}/status`, {
  method: "PUT", headers: adminHeaders, body: JSON.stringify({ action: "approve" })
}), env);
assert.equal(approve.status, 200);

const activeSession = await worker.fetch(new Request("https://example.test/api/session", { headers: { authorization: `Bearer ${childPayload.token}` } }), env);
assert.equal((await activeSession.json()).user.status, "approved");

const childSave = await worker.fetch(new Request("https://example.test/api/progress", {
  method: "PUT", headers: { authorization: `Bearer ${childPayload.token}`, "content-type": "application/json" }, body: JSON.stringify({ progress })
}), env);
assert.equal(childSave.status, 200);

const ban = await worker.fetch(new Request(`https://example.test/api/admin/users/${childPayload.user.id}/status`, {
  method: "PUT", headers: adminHeaders, body: JSON.stringify({ action: "ban" })
}), env);
assert.equal(ban.status, 200);
const bannedSession = await worker.fetch(new Request("https://example.test/api/session", { headers: { authorization: `Bearer ${childPayload.token}` } }), env);
assert.equal(bannedSession.status, 401);

const staticAsset = await worker.fetch(new Request("https://example.test/"), env);
assert.equal(await staticAsset.text(), "asset");

console.log("Worker API tests: OK");

import assert from "node:assert/strict";
import worker from "../src/index.js";

class MemoryD1 {
  constructor() {
    this.row = null;
  }

  prepare(sql) {
    const database = this;
    let values = [];
    return {
      bind(...nextValues) {
        values = nextValues;
        return this;
      },
      async run() {
        if (sql.includes("INSERT INTO player_progress")) {
          database.row = {
            profile_id: values[0],
            progress_json: values[1],
            updated_at: "2026-07-19 12:00:00"
          };
        }
        return { success: true };
      },
      async first() {
        return database.row;
      }
    };
  }
}

const progress = {
  8: {
    xp: 120,
    streak: 3,
    completed: 4,
    correct: 17,
    today: { date: "2026-07-19", count: 2 },
    categories: { math: { xp: 75, correct: 5, wrong: 0, completed: 1 } }
  },
  9: {
    xp: 10,
    streak: 1,
    completed: 1,
    correct: 1,
    today: { date: "2026-07-19", count: 1 },
    categories: { coding: { xp: 7, correct: 0, wrong: 1, completed: 0 } }
  }
};

const emptyCategory = { xp: 0, correct: 0, wrong: 0, completed: 0 };
const expectedProgress = {
  8: {
    ...progress[8],
    categories: {
      math: progress[8].categories.math,
      polish: emptyCategory,
      english: emptyCategory,
      world: emptyCategory,
      logic: emptyCategory,
      reading: emptyCategory,
      coding: emptyCategory
    }
  },
  9: {
    ...progress[9],
    categories: {
      math: emptyCategory,
      polish: emptyCategory,
      english: emptyCategory,
      world: emptyCategory,
      logic: emptyCategory,
      reading: emptyCategory,
      coding: progress[9].categories.coding
    }
  }
};

const env = {
  DB: new MemoryD1(),
  ASSETS: { fetch: async () => new Response("asset") },
  SYNC_CODE_HASH: "c51fd0b24b0e48c5db2cf05afebdb7fcc97ae5de5933841e0e0ed1f0f654cfc7"
};
const headers = { authorization: "Bearer TEST-CODE" };

const preflight = await worker.fetch(new Request("https://example.test/api/progress", { method: "OPTIONS" }), env);
assert.equal(preflight.status, 204);
assert.equal(preflight.headers.get("access-control-allow-origin"), "*");

const unauthorized = await worker.fetch(new Request("https://example.test/api/progress"), env);
assert.equal(unauthorized.status, 401);

const empty = await worker.fetch(new Request("https://example.test/api/progress", { headers }), env);
assert.equal(empty.status, 200);
assert.equal((await empty.json()).progress, null);

const saved = await worker.fetch(new Request("https://example.test/api/progress", {
  method: "PUT",
  headers: { ...headers, "content-type": "application/json" },
  body: JSON.stringify({ progress })
}), env);
assert.equal(saved.status, 200);
assert.equal((await saved.json()).ok, true);

const loaded = await worker.fetch(new Request("https://example.test/api/progress", { headers }), env);
assert.equal(loaded.status, 200);
assert.deepEqual((await loaded.json()).progress, expectedProgress);

const staticAsset = await worker.fetch(new Request("https://example.test/"), env);
assert.equal(await staticAsset.text(), "asset");

console.log("Worker API tests: OK");

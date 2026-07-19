CREATE TABLE IF NOT EXISTS player_progress (
  profile_id TEXT PRIMARY KEY,
  progress_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

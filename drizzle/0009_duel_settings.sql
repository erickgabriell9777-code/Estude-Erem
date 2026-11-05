ALTER TABLE duel_rooms ADD COLUMN host_name TEXT NOT NULL DEFAULT 'Jogador 1';
--> statement-breakpoint
ALTER TABLE duel_rooms ADD COLUMN guest_name TEXT;
--> statement-breakpoint
ALTER TABLE duel_rooms ADD COLUMN seconds_per_question INTEGER NOT NULL DEFAULT 20;
--> statement-breakpoint
ALTER TABLE duel_rooms ADD COLUMN question_started_at TEXT;
--> statement-breakpoint
ALTER TABLE duel_rooms ADD COLUMN theme_id TEXT;

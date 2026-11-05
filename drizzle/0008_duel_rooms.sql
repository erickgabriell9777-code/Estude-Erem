CREATE TABLE `duel_rooms` (
 `code` text PRIMARY KEY NOT NULL,
 `host_id` text NOT NULL,
 `guest_id` text,
 `status` text NOT NULL,
 `questions` text NOT NULL,
 `current_index` integer DEFAULT 0 NOT NULL,
 `created_at` text NOT NULL,
 `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `duel_answers` (
 `code` text NOT NULL,
 `question_index` integer NOT NULL,
 `user_id` text NOT NULL,
 `choice` integer NOT NULL,
 `correct` integer NOT NULL,
 `created_at` text NOT NULL,
 PRIMARY KEY(`code`, `question_index`, `user_id`)
);

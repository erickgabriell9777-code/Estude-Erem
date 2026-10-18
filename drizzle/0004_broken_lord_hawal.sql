CREATE TABLE `study_documents` (
	`user_id` text NOT NULL,
	`id` text NOT NULL,
	`data` text NOT NULL,
	`revision` integer NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `id`)
);
--> statement-breakpoint
CREATE TABLE `study_timers` (
	`user_id` text PRIMARY KEY NOT NULL,
	`elapsed` integer NOT NULL,
	`started_at` integer,
	`revision` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tool_attempts` (
	`user_id` text NOT NULL,
	`id` text NOT NULL,
	`data` text NOT NULL,
	`revision` integer NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `id`)
);

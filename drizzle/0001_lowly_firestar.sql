CREATE TABLE `catalogue_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`topic_id` text NOT NULL,
	`level` text NOT NULL,
	`prompt` text NOT NULL,
	`options` text NOT NULL,
	`answer` integer NOT NULL,
	`explanation` text NOT NULL,
	`source_id` text,
	`position` integer NOT NULL,
	FOREIGN KEY (`topic_id`) REFERENCES `catalogue_topics`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source_id`) REFERENCES `catalogue_sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `catalogue_questions_prompt_unique` ON `catalogue_questions` (`prompt`);--> statement-breakpoint
CREATE TABLE `catalogue_releases` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogue_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`publisher` text NOT NULL,
	`url` text NOT NULL,
	`accessed_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogue_subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short` text NOT NULL,
	`color` text NOT NULL,
	`group_name` text NOT NULL,
	`position` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogue_topics` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_id` text NOT NULL,
	`name` text NOT NULL,
	`summary` text NOT NULL,
	`position` integer NOT NULL,
	FOREIGN KEY (`subject_id`) REFERENCES `catalogue_subjects`(`id`) ON UPDATE no action ON DELETE no action
);

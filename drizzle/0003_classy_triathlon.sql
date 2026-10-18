CREATE TABLE `book_marks` (
	`user_id` text NOT NULL,
	`book_id` text NOT NULL,
	`id` text NOT NULL,
	`data` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `book_id`, `id`)
);
--> statement-breakpoint
CREATE TABLE `book_reading` (
	`user_id` text NOT NULL,
	`book_id` text NOT NULL,
	`page` integer NOT NULL,
	PRIMARY KEY(`user_id`, `book_id`)
);

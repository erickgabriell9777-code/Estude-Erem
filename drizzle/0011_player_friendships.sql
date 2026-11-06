CREATE TABLE `player_ids` (
 `user_id` text PRIMARY KEY NOT NULL,
 `public_id` text NOT NULL UNIQUE,
 `created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `friend_requests` (
 `id` text PRIMARY KEY NOT NULL,
 `requester_id` text NOT NULL,
 `recipient_id` text NOT NULL,
 `status` text NOT NULL DEFAULT 'pending',
 `created_at` text NOT NULL,
 `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friend_requests_pair_pending` ON `friend_requests` (`requester_id`,`recipient_id`) WHERE `status` = 'pending';
--> statement-breakpoint
CREATE TABLE `friend_blocks` (
 `blocker_id` text NOT NULL,
 `blocked_id` text NOT NULL,
 `created_at` text NOT NULL,
 PRIMARY KEY(`blocker_id`,`blocked_id`)
);

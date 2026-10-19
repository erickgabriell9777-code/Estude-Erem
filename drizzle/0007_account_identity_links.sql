CREATE TABLE `auth_identity_links` (
	`auth_user_id` text PRIMARY KEY NOT NULL,
	`app_user_id` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_identity_links_app_user_id_unique` ON `auth_identity_links` (`app_user_id`);
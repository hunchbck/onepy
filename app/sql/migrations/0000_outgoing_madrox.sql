CREATE TABLE "user_onepy" (
	"user_onepy_id" uuid PRIMARY KEY NOT NULL,
	"nickname" varchar(32) NOT NULL,
	"profile_image" varchar(255),
	"certification" jsonb DEFAULT '{}'::jsonb,
	"stats" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
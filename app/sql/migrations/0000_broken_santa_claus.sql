CREATE TYPE "public"."onepy_money_action" AS ENUM('지급', '사용', '환불');--> statement-breakpoint
CREATE TABLE "onepy_money_log" (
	"onepy_money_log_id" serial PRIMARY KEY NOT NULL,
	"user_onepy_id" uuid NOT NULL,
	"action" "onepy_money_action" NOT NULL,
	"amount" integer NOT NULL,
	"reason" varchar(64),
	"meta" jsonb DEFAULT '{}'::jsonb,
	"total_onepy_money" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_onepy" (
	"user_onepy_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"nickname" varchar(32) NOT NULL,
	"phone" varchar(32),
	"avatar" varchar(255),
	"certification" jsonb DEFAULT '{"email":false,"mobile":false}'::jsonb,
	"stats" jsonb DEFAULT '{"money":{"onepy_money":10000,"real_money":0},"follower":{"sale":0,"buy":0},"following":{"sale":0,"buy":0},"like":{"user":0,"product":0,"community":0},"dislike":{"user":0,"product":0,"community":0}}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "onepy_money_log" ADD CONSTRAINT "onepy_money_log_user_onepy_id_user_onepy_user_onepy_id_fk" FOREIGN KEY ("user_onepy_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_onepy" ADD CONSTRAINT "user_onepy_user_onepy_id_users_id_fk" FOREIGN KEY ("user_onepy_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_onepy_nickname_unique" ON "user_onepy" USING btree ("nickname");
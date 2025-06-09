CREATE TABLE "onepy_charge" (
	"onepy_charge_id" serial PRIMARY KEY NOT NULL,
	"charge_name" varchar(64) NOT NULL,
	"charge_price" integer DEFAULT 0 NOT NULL,
	"charge_status" boolean DEFAULT true NOT NULL,
	"charge_meta" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "onepy_money_log" ADD COLUMN "price" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "onepy_money_log" DROP COLUMN "action";--> statement-breakpoint
ALTER TABLE "onepy_money_log" DROP COLUMN "amount";--> statement-breakpoint
ALTER TABLE "onepy_money_log" DROP COLUMN "reason";--> statement-breakpoint
ALTER TABLE "onepy_money_log" DROP COLUMN "total_onepy_money";--> statement-breakpoint
DROP TYPE "public"."onepy_money_action";
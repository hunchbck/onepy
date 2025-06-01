ALTER TABLE "payment_log" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "payment_log" CASCADE;--> statement-breakpoint
ALTER TABLE "onepy_money_log" RENAME COLUMN "user_id" TO "user_onepy_id";--> statement-breakpoint
ALTER TABLE "payment" RENAME COLUMN "user_id" TO "user_onepy_id";--> statement-breakpoint
ALTER TABLE "real_money_log" RENAME COLUMN "user_id" TO "user_onepy_id";--> statement-breakpoint
ALTER TABLE "onepy_money_log" DROP CONSTRAINT "onepy_money_log_user_id_user_onepy_user_onepy_id_fk";
--> statement-breakpoint
ALTER TABLE "payment" DROP CONSTRAINT "payment_user_id_user_onepy_user_onepy_id_fk";
--> statement-breakpoint
ALTER TABLE "real_money_log" DROP CONSTRAINT "real_money_log_user_id_user_onepy_user_onepy_id_fk";
--> statement-breakpoint
ALTER TABLE "onepy_money_log" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "total_amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "paid_amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "paid_amount" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "money_amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "money_amount" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "real_money_log" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "onepy_money_log" ADD CONSTRAINT "onepy_money_log_user_onepy_id_user_onepy_user_onepy_id_fk" FOREIGN KEY ("user_onepy_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_onepy_id_user_onepy_user_onepy_id_fk" FOREIGN KEY ("user_onepy_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_money_log" ADD CONSTRAINT "real_money_log_user_onepy_id_user_onepy_user_onepy_id_fk" FOREIGN KEY ("user_onepy_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" DROP COLUMN "updated_at";
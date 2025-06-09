ALTER TABLE public.onepy_money_log ALTER COLUMN user_onepy_id DROP NOT NULL;
ALTER TABLE "onepy_money_log" DROP CONSTRAINT "onepy_money_log_user_onepy_id_fkey";
--> statement-breakpoint
ALTER TABLE "onepy_money_log" ALTER COLUMN "user_onepy_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "onepy_money_log" ADD CONSTRAINT "onepy_money_log_user_onepy_id_fkey" FOREIGN KEY ("user_onepy_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE set null ON UPDATE no action;
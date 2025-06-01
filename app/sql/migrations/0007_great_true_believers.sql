CREATE TYPE "public"."onepy_money_action" AS ENUM('지급', '사용', '환불');--> statement-breakpoint
CREATE TYPE "public"."real_money_action" AS ENUM('충전', '결제', '환불');--> statement-breakpoint
ALTER TABLE "onepy_money_log" RENAME COLUMN "type" TO "action";--> statement-breakpoint
ALTER TABLE "real_money_log" RENAME COLUMN "type" TO "action";--> statement-breakpoint
ALTER TABLE "onepy_money_log" ADD COLUMN "total_onepy_money" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "real_money_log" ADD COLUMN "total_real_money" integer NOT NULL;
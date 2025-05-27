CREATE TABLE "onepy_money_log" (
	"onepy_money_log_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(16) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"reason" varchar(64),
	"meta" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"status" varchar(16) NOT NULL,
	"total_amount" numeric(12, 2) NOT NULL,
	"paid_amount" numeric(12, 2) DEFAULT '0' NOT NULL,
	"money_amount" numeric(12, 2) DEFAULT '0' NOT NULL,
	"meta" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_log" (
	"payment_log_id" serial PRIMARY KEY NOT NULL,
	"payment_id" serial NOT NULL,
	"status" varchar(16) NOT NULL,
	"reason" varchar(64),
	"meta" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "real_money_log" (
	"real_money_log_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(16) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"reason" varchar(64),
	"meta" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

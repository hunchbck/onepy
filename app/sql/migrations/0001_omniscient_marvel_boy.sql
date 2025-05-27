CREATE TABLE "avatar" (
	"avatar_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"url" varchar(255) NOT NULL,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_card" (
	"business_card_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(64) NOT NULL,
	"company" varchar(64),
	"position" varchar(32),
	"phone" varchar(32),
	"email" varchar(64),
	"image_url" varchar(255),
	"is_main" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_card_image" (
	"business_card_image_id" serial PRIMARY KEY NOT NULL,
	"business_card_id" serial NOT NULL,
	"url" varchar(255) NOT NULL,
	"is_main" boolean DEFAULT false,
	"description" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company" (
	"company_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"business_no" varchar(16) NOT NULL,
	"address" varchar(128),
	"phone" varchar(32),
	"email" varchar(64),
	"file_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_company_group_map" (
	"company_company_group_map_id" serial PRIMARY KEY NOT NULL,
	"company_id" uuid NOT NULL,
	"company_group_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_file" (
	"company_file_id" serial PRIMARY KEY NOT NULL,
	"company_id" uuid NOT NULL,
	"url" varchar(255) NOT NULL,
	"file_type" varchar(32) NOT NULL,
	"is_main" boolean DEFAULT false,
	"description" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_group" (
	"company_group_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"description" varchar(128),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_company_map" (
	"user_company_map_id" serial PRIMARY KEY NOT NULL,
	"user_onepy_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false,
	"position" varchar(32),
	"joined_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_user_id_user_onepy_user_onepy_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_card" ADD CONSTRAINT "business_card_user_id_user_onepy_user_onepy_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_card_image" ADD CONSTRAINT "business_card_image_business_card_id_business_card_business_card_id_fk" FOREIGN KEY ("business_card_id") REFERENCES "public"."business_card"("business_card_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_company_group_map" ADD CONSTRAINT "company_company_group_map_company_id_company_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("company_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_company_group_map" ADD CONSTRAINT "company_company_group_map_company_group_id_company_group_company_group_id_fk" FOREIGN KEY ("company_group_id") REFERENCES "public"."company_group"("company_group_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_file" ADD CONSTRAINT "company_file_company_id_company_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("company_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_company_map" ADD CONSTRAINT "user_company_map_user_onepy_id_user_onepy_user_onepy_id_fk" FOREIGN KEY ("user_onepy_id") REFERENCES "public"."user_onepy"("user_onepy_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_company_map" ADD CONSTRAINT "user_company_map_company_id_company_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("company_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "company_name_unique" ON "company" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "company_business_no_unique" ON "company" USING btree ("business_no");--> statement-breakpoint
CREATE UNIQUE INDEX "company_group_name_unique" ON "company_group" USING btree ("name");
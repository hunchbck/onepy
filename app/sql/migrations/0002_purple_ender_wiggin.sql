CREATE TABLE "center" (
	"center_id" serial PRIMARY KEY NOT NULL,
	"type" varchar(16) NOT NULL,
	"name" varchar(64) NOT NULL,
	"address_city" varchar(32) NOT NULL,
	"address_gu" varchar(32) NOT NULL,
	"address_dong" varchar(32),
	"address_detail" varchar(128),
	"zipcode" varchar(8),
	"lat" numeric(9, 6),
	"lng" numeric(9, 6),
	"area_info" jsonb DEFAULT '{}'::jsonb,
	"total_area" numeric(12, 2),
	"rate_info" jsonb DEFAULT '{}'::jsonb,
	"elevator" jsonb DEFAULT '{}'::jsonb,
	"building_meta" jsonb DEFAULT '{}'::jsonb,
	"memo" text,
	"view_count" integer DEFAULT 0,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "center_contractor_map" (
	"center_contractor_map_id" serial PRIMARY KEY NOT NULL,
	"center_id" integer NOT NULL,
	"company_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "center_developer_map" (
	"center_company_map_id" serial PRIMARY KEY NOT NULL,
	"center_id" integer NOT NULL,
	"company_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "center_floorplan" (
	"center_floorplan_id" serial PRIMARY KEY NOT NULL,
	"center_id" integer NOT NULL,
	"floor" integer NOT NULL,
	"url" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "center_history" (
	"center_history_id" serial PRIMARY KEY NOT NULL,
	"center_id" integer NOT NULL,
	"version" integer NOT NULL,
	"data_before" jsonb,
	"data_after" jsonb NOT NULL,
	"changed_by" uuid NOT NULL,
	"reason" varchar(128),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "center_photo" (
	"center_photo_id" serial PRIMARY KEY NOT NULL,
	"center_id" integer NOT NULL,
	"url" varchar(255) NOT NULL,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "center_unit_price" (
	"center_unit_price_id" serial PRIMARY KEY NOT NULL,
	"center_id" integer NOT NULL,
	"code" varchar(32) NOT NULL,
	"usage" varchar(32),
	"dong" varchar(16),
	"floor" integer,
	"unit_order" integer,
	"height" numeric(5, 2),
	"unit" varchar(16),
	"status" varchar(16),
	"land_area" numeric(10, 2),
	"parking_area" numeric(10, 2),
	"common_area" numeric(10, 2),
	"balcony_area" numeric(10, 2),
	"exclusive_area" numeric(10, 2),
	"supply_area" numeric(10, 2),
	"price_per_py" integer,
	"price" numeric(18, 0),
	"land_price" numeric(18, 0),
	"building_price" numeric(18, 0),
	"final_price_per_py" integer,
	"final_price" numeric(18, 0),
	"exclusive_price_per_py" integer,
	"resale_price" numeric(18, 0),
	"record_date" date DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "center_unit_price_history" (
	"center_unit_price_history_id" serial PRIMARY KEY NOT NULL,
	"center_unit_price_id" integer NOT NULL,
	"version" integer NOT NULL,
	"data_before" jsonb,
	"data_after" jsonb NOT NULL,
	"changed_by" uuid NOT NULL,
	"reason" varchar(128),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "center_contractor_map" ADD CONSTRAINT "center_contractor_map_center_id_center_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."center"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_developer_map" ADD CONSTRAINT "center_developer_map_center_id_center_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."center"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_floorplan" ADD CONSTRAINT "center_floorplan_center_id_center_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."center"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_history" ADD CONSTRAINT "center_history_center_id_center_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."center"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_photo" ADD CONSTRAINT "center_photo_center_id_center_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."center"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_unit_price" ADD CONSTRAINT "center_unit_price_center_id_center_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."center"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_unit_price_history" ADD CONSTRAINT "center_unit_price_history_center_unit_price_id_center_unit_price_center_unit_price_id_fk" FOREIGN KEY ("center_unit_price_id") REFERENCES "public"."center_unit_price"("center_unit_price_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "center_name_unique" ON "center" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "center_unit_price_code_unique" ON "center_unit_price" USING btree ("code");
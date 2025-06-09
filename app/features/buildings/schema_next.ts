import { sql } from "drizzle-orm";
import {
  date,
  integer,
  jsonb,
  numeric,
  pgPolicy,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

// 외부 참조: user_onepy, company

export const center = pgTable(
  "center",
  {
    centerId: serial("center_id").primaryKey().notNull(),
    type: varchar("type", { length: 16 }).notNull(),
    name: varchar("name", { length: 64 }).notNull(),
    addressCity: varchar("address_city", { length: 32 }).notNull(),
    addressGu: varchar("address_gu", { length: 32 }).notNull(),
    addressDong: varchar("address_dong", { length: 32 }),
    addressDetail: varchar("address_detail", { length: 128 }),
    zipcode: varchar("zipcode", { length: 8 }),
    lat: numeric("lat", { precision: 9, scale: 6 }),
    lng: numeric("lng", { precision: 9, scale: 6 }),
    areaInfo: jsonb("area_info").default({}),
    totalArea: numeric("total_area", { precision: 12, scale: 2 }),
    rateInfo: jsonb("rate_info").default({}),
    elevator: jsonb("elevator").default({}),
    buildingMeta: jsonb("building_meta").default({}),
    memo: text("memo"),
    viewCount: integer("view_count").default(0),
    createdBy: uuid("created_by").notNull(), // FK(user_onepy.id)
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Public can select", {
      for: "select",
      to: "public",
      using: sql`true`
    }),
    pgPolicy("Authenticated users can update", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("No delete allowed", {
      for: "delete",
      using: sql`false`
    })
  ]
);

export const centerHistory = pgTable(
  "center_history",
  {
    centerHistoryId: serial("center_history_id").primaryKey().notNull(),
    centerId: integer("center_id")
      .notNull()
      .references(() => center.centerId, { onDelete: "cascade" }),
    action: varchar("action", { length: 32 }).notNull(),
    meta: jsonb("meta").default({}),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Authenticated users can select", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("No update allowed", {
      for: "update",
      using: sql`false`
    }),
    pgPolicy("Authenticated users can delete", {
      for: "delete",
      to: authenticatedRole,
      using: sql`true`
    })
  ]
);

export const centerUnitPrice = pgTable(
  "center_unit_price",
  {
    centerUnitPriceId: serial("center_unit_price_id").primaryKey().notNull(),
    centerId: integer("center_id")
      .notNull()
      .references(() => center.centerId, { onDelete: "cascade" }),
    code: varchar("code", { length: 32 }).notNull(),
    usage: varchar("usage", { length: 32 }),
    dong: varchar("dong", { length: 16 }),
    floor: integer("floor"),
    unitOrder: integer("unit_order"),
    height: numeric("height", { precision: 5, scale: 2 }),
    unit: varchar("unit", { length: 16 }),
    status: varchar("status", { length: 16 }),
    landArea: numeric("land_area", { precision: 10, scale: 2 }),
    parkingArea: numeric("parking_area", { precision: 10, scale: 2 }),
    commonArea: numeric("common_area", { precision: 10, scale: 2 }),
    balconyArea: numeric("balcony_area", { precision: 10, scale: 2 }),
    exclusiveArea: numeric("exclusive_area", { precision: 10, scale: 2 }),
    supplyArea: numeric("supply_area", { precision: 10, scale: 2 }),
    pricePerPy: integer("price_per_py"),
    price: numeric("price", { precision: 18, scale: 0 }),
    landPrice: numeric("land_price", { precision: 18, scale: 0 }),
    buildingPrice: numeric("building_price", { precision: 18, scale: 0 }),
    finalPricePerPy: integer("final_price_per_py"),
    finalPrice: numeric("final_price", { precision: 18, scale: 0 }),
    exclusivePricePerPy: integer("exclusive_price_per_py"),
    resalePrice: numeric("resale_price", { precision: 18, scale: 0 }),
    recordDate: date("record_date").notNull().defaultNow(),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Authenticated users can select", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can update", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can delete", {
      for: "delete",
      to: authenticatedRole,
      using: sql`true`
    })
  ]
);

export const centerUnitPriceHistory = pgTable(
  "center_unit_price_history",
  {
    centerUnitPriceHistoryId: serial("center_unit_price_history_id")
      .primaryKey()
      .notNull(),
    centerUnitPriceId: integer("center_unit_price_id")
      .notNull()
      .references(() => centerUnitPrice.centerUnitPriceId, {
        onDelete: "cascade"
      }),
    action: varchar("action", { length: 32 }).notNull(),
    meta: jsonb("meta").default({}),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Authenticated users can select", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("No update allowed", {
      for: "update",
      using: sql`false`
    }),
    pgPolicy("Authenticated users can delete", {
      for: "delete",
      to: authenticatedRole,
      using: sql`true`
    })
  ]
);

export const centerPhoto = pgTable(
  "center_photo",
  {
    centerPhotoId: serial("center_photo_id").primaryKey().notNull(),
    centerId: integer("center_id")
      .notNull()
      .references(() => center.centerId, { onDelete: "cascade" }),
    url: varchar("url", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Public can select", {
      for: "select",
      to: "public",
      using: sql`true`
    }),
    pgPolicy("Authenticated users can update", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can delete", {
      for: "delete",
      to: authenticatedRole,
      using: sql`true`
    })
  ]
);

export const centerFloorplan = pgTable(
  "center_floorplan",
  {
    centerFloorplanId: serial("center_floorplan_id").primaryKey().notNull(),
    centerId: integer("center_id")
      .notNull()
      .references(() => center.centerId, { onDelete: "cascade" }),
    url: varchar("url", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Public can select", {
      for: "select",
      to: "public",
      using: sql`true`
    }),
    pgPolicy("Authenticated users can update", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can delete", {
      for: "delete",
      to: authenticatedRole,
      using: sql`true`
    })
  ]
);

export const centerContractorMap = pgTable(
  "center_contractor_map",
  {
    centerContractorMapId: serial("center_contractor_map_id")
      .primaryKey()
      .notNull(),
    centerId: integer("center_id").notNull(),
    contractorId: integer("contractor_id").notNull(),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Authenticated users can select", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can update", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can delete", {
      for: "delete",
      to: authenticatedRole,
      using: sql`true`
    })
  ]
);

export const centerDeveloperMap = pgTable(
  "center_developer_map",
  {
    centerDeveloperMapId: serial("center_developer_map_id")
      .primaryKey()
      .notNull(),
    centerId: integer("center_id").notNull(),
    developerId: integer("developer_id").notNull(),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    pgPolicy("Authenticated users can insert", {
      for: "insert",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`
    }),
    pgPolicy("Authenticated users can select", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can update", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`
    }),
    pgPolicy("Authenticated users can delete", {
      for: "delete",
      to: authenticatedRole,
      using: sql`true`
    })
  ]
);

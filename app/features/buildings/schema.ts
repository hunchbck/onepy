import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

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
  (table) => ({
    nameUnique: uniqueIndex("center_name_unique").on(table.name)
  })
);

export const centerHistory = pgTable("center_history", {
  centerHistoryId: serial("center_history_id").primaryKey().notNull(),
  centerId: integer("center_id")
    .notNull()
    .references(() => center.centerId),
  version: integer("version").notNull(),
  dataBefore: jsonb("data_before"),
  dataAfter: jsonb("data_after").notNull(),
  changedBy: uuid("changed_by").notNull(), // FK(user_onepy.id)
  reason: varchar("reason", { length: 128 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const centerUnitPrice = pgTable(
  "center_unit_price",
  {
    centerUnitPriceId: serial("center_unit_price_id").primaryKey().notNull(),
    centerId: integer("center_id")
      .notNull()
      .references(() => center.centerId),
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
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdBy: uuid("created_by").notNull() // FK(user_onepy.id)
  },
  (table) => ({
    codeUnique: uniqueIndex("center_unit_price_code_unique").on(table.code)
  })
);

export const centerUnitPriceHistory = pgTable("center_unit_price_history", {
  centerUnitPriceHistoryId: serial("center_unit_price_history_id")
    .primaryKey()
    .notNull(),
  centerUnitPriceId: integer("center_unit_price_id")
    .notNull()
    .references(() => centerUnitPrice.centerUnitPriceId),
  version: integer("version").notNull(),
  dataBefore: jsonb("data_before"),
  dataAfter: jsonb("data_after").notNull(),
  changedBy: uuid("changed_by").notNull(), // FK(user_onepy.id)
  reason: varchar("reason", { length: 128 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const centerPhoto = pgTable("center_photo", {
  centerPhotoId: serial("center_photo_id").primaryKey().notNull(),
  centerId: integer("center_id")
    .notNull()
    .references(() => center.centerId),
  url: varchar("url", { length: 255 }).notNull(),
  isMain: boolean("is_main").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const centerFloorplan = pgTable("center_floorplan", {
  centerFloorplanId: serial("center_floorplan_id").primaryKey().notNull(),
  centerId: integer("center_id")
    .notNull()
    .references(() => center.centerId),
  floor: integer("floor").notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const centerContractorMap = pgTable("center_contractor_map", {
  centerContractorMapId: serial("center_contractor_map_id")
    .primaryKey()
    .notNull(),
  centerId: integer("center_id")
    .notNull()
    .references(() => center.centerId),
  companyId: uuid("company_id").notNull(), // FK(company.company_id)
  isMain: boolean("is_main").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const centerDeveloperMap = pgTable("center_developer_map", {
  centerDeveloperMapId: serial("center_company_map_id").primaryKey().notNull(),
  centerId: integer("center_id")
    .notNull()
    .references(() => center.centerId),
  companyId: uuid("company_id").notNull(), // FK(company.company_id)
  isMain: boolean("is_main").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

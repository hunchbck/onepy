import { sql } from "drizzle-orm";
import {
  boolean,
  pgPolicy,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { userOnepy } from "./schema";

// 회사 테이블
export const company = pgTable(
  "company",
  {
    companyId: uuid("company_id").primaryKey().notNull(),
    name: varchar("name", { length: 64 }).notNull(),
    businessNo: varchar("business_no", { length: 16 }).notNull(),
    address: varchar("address", { length: 128 }),
    phone: varchar("phone", { length: 32 }),
    email: varchar("email", { length: 64 }),
    fileUrl: varchar("file_url", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    uniqueIndex("company_business_no_unique").on(table.businessNo),
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

// 회사 그룹 테이블
export const companyGroup = pgTable(
  "company_group",
  {
    companyGroupId: uuid("company_group_id").primaryKey().notNull(),
    name: varchar("name", { length: 32 }).notNull(),
    description: varchar("description", { length: 128 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    uniqueIndex("company_group_name_unique").on(table.name),
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

// 회사 파일 테이블
export const companyFile = pgTable(
  "company_file",
  {
    companyFileId: serial("company_file_id").primaryKey().notNull(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => company.companyId, { onDelete: "cascade" }),
    url: varchar("url", { length: 255 }).notNull(),
    fileType: varchar("file_type", { length: 32 }).notNull(),
    isMain: boolean("is_main").default(false),
    description: varchar("description", { length: 64 }),
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

// 회원 명함 테이블
export const businessCard = pgTable(
  "business_card",
  {
    businessCardId: serial("business_card_id").primaryKey().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }),
    name: varchar("name", { length: 64 }).notNull(),
    company: varchar("company", { length: 64 }),
    position: varchar("position", { length: 32 }),
    phone: varchar("phone", { length: 32 }),
    email: varchar("email", { length: 64 }),
    imageUrl: varchar("image_url", { length: 255 }),
    isMain: boolean("is_main").default(false),
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

// 명함 이미지 테이블
export const businessCardImage = pgTable(
  "business_card_image",
  {
    businessCardImageId: serial("business_card_image_id")
      .primaryKey()
      .notNull(),
    businessCardId: serial("business_card_id")
      .notNull()
      .references(() => businessCard.businessCardId, { onDelete: "cascade" }),
    url: varchar("url", { length: 255 }).notNull(),
    isMain: boolean("is_main").default(false),
    description: varchar("description", { length: 64 }),
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

// 아바타 테이블
export const avatar = pgTable(
  "avatar",
  {
    avatarId: serial("avatar_id").primaryKey().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }),
    url: varchar("url", { length: 255 }).notNull(),
    isMain: boolean("is_main").default(false),
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

// 회원-회사 매핑 테이블
export const userCompanyMap = pgTable(
  "user_company_map",
  {
    userCompanyMapId: serial("user_company_map_id").primaryKey().notNull(),
    userOnepyId: uuid("user_onepy_id")
      .notNull()
      .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }),
    companyId: uuid("company_id")
      .notNull()
      .references(() => company.companyId, { onDelete: "cascade" }),
    isMain: boolean("is_main").default(false),
    position: varchar("position", { length: 32 }),
    joinedAt: timestamp("joined_at", { withTimezone: true }),
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

// 회사-회사그룹 매핑 테이블
export const companyCompanyGroupMap = pgTable(
  "company_company_group_map",
  {
    companyCompanyGroupMapId: serial("company_company_group_map_id")
      .primaryKey()
      .notNull(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => company.companyId, { onDelete: "cascade" }),
    companyGroupId: uuid("company_group_id")
      .notNull()
      .references(() => companyGroup.companyGroupId, { onDelete: "cascade" }),
    isMain: boolean("is_main").default(false),
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

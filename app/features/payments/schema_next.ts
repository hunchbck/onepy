import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { userOnepy } from "~/features/users/schema";

// 외부 참조: user_onepy

export const product = pgTable("product", {
  productId: serial("product_id").primaryKey().notNull(),
  product_name: varchar("name", { length: 64 }).notNull(),
  product_price: integer("price").notNull(),
  product_status: boolean("status").notNull().default(true), // 사용중 or 중지
  product_meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const realMoneyLog = pgTable("real_money_log", {
  realMoneyLogId: serial("real_money_log_id").primaryKey().notNull(),
  userId: uuid("user_onepy_id")
    .notNull()
    .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }), // FK(user_onepy.id)
  tosspayment_id: integer("tosspayment_id"), // FK(product)
  productId: integer("product_id"), // FK(product)
  price: integer("price").notNull().default(0),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const payment = pgTable("payment", {
  paymentId: serial("payment_id").primaryKey().notNull(),
  userId: uuid("user_onepy_id")
    .notNull()
    .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }), // FK(user_onepy.id)
  productId: integer("product_id").notNull(), // FK(product)
  price: integer("price").notNull(),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

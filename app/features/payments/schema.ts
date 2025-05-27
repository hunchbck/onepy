import {
  jsonb,
  numeric,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

// 외부 참조: user_onepy

export const payment = pgTable("payment", {
  paymentId: serial("payment_id").primaryKey().notNull(),
  userId: uuid("user_id").notNull(), // FK(user_onepy.id)
  status: varchar("status", { length: 16 }).notNull(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
  paidAmount: numeric("paid_amount", { precision: 12, scale: 2 })
    .notNull()
    .default("0"),
  moneyAmount: numeric("money_amount", { precision: 12, scale: 2 })
    .notNull()
    .default("0"),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const paymentLog = pgTable("payment_log", {
  paymentLogId: serial("payment_log_id").primaryKey().notNull(),
  paymentId: serial("payment_id").notNull(), // FK(payment.payment_id)
  status: varchar("status", { length: 16 }).notNull(),
  reason: varchar("reason", { length: 64 }),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const onepyMoneyLog = pgTable("onepy_money_log", {
  onepyMoneyLogId: serial("onepy_money_log_id").primaryKey().notNull(),
  userId: uuid("user_id").notNull(), // FK(user_onepy.id)
  type: varchar("type", { length: 16 }).notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  reason: varchar("reason", { length: 64 }),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const realMoneyLog = pgTable("real_money_log", {
  realMoneyLogId: serial("real_money_log_id").primaryKey().notNull(),
  userId: uuid("user_id").notNull(), // FK(user_onepy.id)
  type: varchar("type", { length: 16 }).notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  reason: varchar("reason", { length: 64 }),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

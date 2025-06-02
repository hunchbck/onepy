import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { userOnepy } from "~/features/users/schema";

// enum 정의
export const onepyMoneyActionEnum = pgEnum("onepy_money_action", [
  "지급",
  "사용",
  "환불"
]);
export const realMoneyActionEnum = pgEnum("real_money_action", [
  "충전",
  "결제",
  "환불"
]);

// 외부 참조: user_onepy

export const payment = pgTable("payment", {
  paymentId: serial("payment_id").primaryKey().notNull(),
  userId: uuid("user_onepy_id")
    .notNull()
    .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }), // FK(user_onepy.id)
  status: varchar("status", { length: 16 }).notNull(),
  totalAmount: integer("total_amount").notNull(),
  realAmount: integer("paid_amount").notNull().default(0),
  onepyAmount: integer("money_amount").notNull().default(0),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const onepyMoneyLog = pgTable("onepy_money_log", {
  onepyMoneyLogId: serial("onepy_money_log_id").primaryKey().notNull(),
  userId: uuid("user_onepy_id")
    .notNull()
    .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }), // FK(user_onepy.id)
  action: onepyMoneyActionEnum("action").notNull(),
  amount: integer("amount").notNull(),
  reason: varchar("reason", { length: 64 }),
  meta: jsonb("meta").default({}),
  totalOnepyMoney: integer("total_onepy_money").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const realMoneyLog = pgTable("real_money_log", {
  realMoneyLogId: serial("real_money_log_id").primaryKey().notNull(),
  userId: uuid("user_onepy_id")
    .notNull()
    .references(() => userOnepy.userOnepyId, { onDelete: "cascade" }), // FK(user_onepy.id)
  action: realMoneyActionEnum("action").notNull(),
  amount: integer("amount").notNull(),
  reason: varchar("reason", { length: 64 }),
  meta: jsonb("meta").default({}),
  totalRealMoney: integer("total_real_money").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

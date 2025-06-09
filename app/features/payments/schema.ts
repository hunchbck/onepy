import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgPolicy,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { userOnepy } from "~/features/users/schema";

// 외부 참조: user_onepy

export const onepyCharge = pgTable(
  "onepy_charge",
  {
    onepyChargeId: serial("onepy_charge_id").primaryKey().notNull(),
    charge_name: varchar("charge_name", { length: 64 }).notNull(),
    charge_price: integer("charge_price").notNull().default(0),
    charge_status: boolean("charge_status").notNull().default(true), // 사용중 or 중지
    charge_meta: jsonb("charge_meta").default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  // RLS 정책 정의
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
    pgPolicy("No delete allowed", {
      for: "delete",
      using: sql`false`
    })
  ]
);

export const onepyMoneyLog = pgTable(
  "onepy_money_log",
  {
    onepyMoneyLogId: serial("onepy_money_log_id").primaryKey().notNull(),
    userId: uuid("user_onepy_id").references(() => userOnepy.userOnepyId, {
      onDelete: "set null"
    }), // FK(user_onepy.id), nullable
    price: integer("price").notNull().default(0),
    meta: jsonb("meta").default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  // RLS 정책 정의
  (table) => [
    // 로그인한 사용자는 모두 select 가능
    pgPolicy("Authenticated users can select", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`
    }),
    // insert: 트리거에서만 허용 (직접 insert 불가)
    pgPolicy("Insert only via trigger", {
      for: "insert",
      using: sql`false`,
      withCheck: sql`false`
    }),
    // update: 불가
    pgPolicy("No update allowed", {
      for: "update",
      using: sql`false`
    }),
    // delete: 불가
    pgPolicy("No delete allowed", {
      for: "delete",
      using: sql`false`
    })
  ]
);

export const onepyChargeSeed = [
  {
    charge_name: "관리자 충전",
    charge_price: 10000,
    charge_status: true,
    charge_meta: { reason: "관리자가 10,000원 충전 해 드렸어요" }
  },
  {
    charge_name: "회원 가입",
    charge_price: 10000,
    charge_status: true,
    charge_meta: { reason: "회원 가입 축하금 10,000원 충전 해 드렸어요" }
  },
  {
    charge_name: "회원 추천",
    charge_price: 10000,
    charge_status: true,
    charge_meta: {
      reason: "다른 회원을 추천해 주셔서 10,000원 충전 해 드렸어요"
    }
  },
  {
    charge_name: "권유 회원 알림",
    charge_price: 10000,
    charge_status: true,
    charge_meta: { reason: "권유 회원을 알려 주셔서 10,000원 충전 해 드렸어요" }
  }
];

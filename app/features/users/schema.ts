import { sql } from "drizzle-orm";
import {
  jsonb,
  pgPolicy,
  pgRole,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUid, authUsers } from "drizzle-orm/supabase";

// 관리자 역할 정의 (DB에 이미 존재한다고 가정)
export const adminRole = pgRole("admin").existing();

export const userOnepy = pgTable(
  "user_onepy",
  {
    userOnepyId: uuid("user_onepy_id")
      .primaryKey()
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 32 }).notNull(),
    nickname: varchar("nickname", { length: 32 }).notNull(),
    phone: varchar("phone", { length: 32 }),
    avatar: varchar("avatar", { length: 255 }),
    certification: jsonb("certification").default({
      email: false,
      mobile: false
    }),
    stats: jsonb("stats").default({
      money: { onepy_money: 10000, real_money: 0 },
      follower: { sale: 0, buy: 0 },
      following: { sale: 0, buy: 0 },
      like: { user: 0, product: 0, community: 0 },
      dislike: { user: 0, product: 0, community: 0 }
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    uniqueIndex("user_onepy_nickname_unique").on(table.nickname),
    // 로그인한 사용자는 모두 select 가능
    pgPolicy("Authenticated users can select all rows", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`
    }),
    // 본인만 update 가능
    pgPolicy("Authenticated users can update their own row", {
      for: "update",
      to: authenticatedRole,
      using: sql`${table.userOnepyId} = ${authUid}`
    }),
    // 관리자만 delete 가능
    pgPolicy("Admin can delete any row", {
      for: "delete",
      to: adminRole,
      using: sql`true`
    }),
    // 본인만 insert 가능 (원래 정책 유지)
    pgPolicy("Authenticated users can insert their own row", {
      for: "insert",
      to: authenticatedRole,
      withCheck: sql`${table.userOnepyId} = ${authUid}`
    })
  ]
);

// // user_supabase는 외부 인증 테이블이므로 아래와 같이 참조만 명시
// const users = pgSchema("auth").table("users", {
//   id: uuid().primaryKey()
// });

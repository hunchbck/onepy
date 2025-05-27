import {
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const userOnepy = pgTable(
  "user_onepy",
  {
    userOnepyId: uuid("user_onepy_id")
      .primaryKey()
      .notNull()
      .references(() => userSupabase.id, { onDelete: "cascade" }),
    nickname: varchar("nickname", { length: 32 }).notNull(),
    profileImage: varchar("profile_image", { length: 255 }),
    certification: jsonb("certification").default({}),
    stats: jsonb("stats").default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => {
    return {
      nicknameUnique: uniqueIndex("user_onepy_nickname_unique").on(
        table.nickname
      )
    };
  }
);

// user_supabase는 외부 인증 테이블이므로 아래와 같이 참조만 명시
export const userSupabase = pgTable("user_supabase", {
  id: uuid("id").primaryKey().notNull()
  // ... 기타 필드 필요시 추가
});

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { nickname }: { nickname: string }
) => {
  const { data, error } = await client
    .from("user_onepy")
    .select(
      `
        user_onepy_id,
        nickname,
        avatar
        `
    )
    .eq("nickname", nickname)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserById = async (
  client: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("user_onepy")
    .select(
      `
        user_onepy_id,
        name,
        nickname,
        avatar
        `
    )
    .eq("user_onepy_id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

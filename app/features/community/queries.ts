import type { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { type Database } from "~/supa-client";
import { PAGE_SIZE } from "../products/constants";

export const getTopics = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) throw new Error(error.message);
  return data;
};

export const getPosts = async (
  client: SupabaseClient<Database>,
  {
    page = 1,
    sorting = "newest",
    period = "all",
    keyword,
    topic
  }: {
    page: number;
    sorting: "newest" | "popular";
    period?: "all" | "today" | "week" | "month" | "year";
    keyword?: string;
    topic?: string;
  }
) => {
  let query = client.from("community_post_list_view").select(`*`);

  if (keyword) {
    query = query.ilike("title", `%${keyword}%`);
  }

  if (topic) {
    query = query.eq("topic_slug", topic);
  }

  if (sorting === "newest") {
    query = query.order("created_at", { ascending: false });
  } else if (sorting === "popular") {
    query = query.order("upvotes", { ascending: false });

    const date = DateTime.now().setZone("Asia/Seoul");
    if (period === "today") {
      query = query.gte("created_at", date.startOf("day").toISO());
    } else if (period === "week") {
      query = query.gte("created_at", date.startOf("week").toISO());
    } else if (period === "month") {
      query = query.gte("created_at", date.startOf("month").toISO());
    } else if (period === "year") {
      query = query.gte("created_at", date.startOf("year").toISO());
    }
  }

  query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const getPostPages = async (
  client: SupabaseClient<Database>,
  {
    sorting = "newest",
    period = "all",
    keyword,
    topic
  }: {
    sorting: "newest" | "popular";
    period?: "all" | "today" | "week" | "month" | "year";
    keyword?: string;
    topic?: string;
  }
) => {
  let query = client
    .from("community_post_list_view")
    .select("post_id", { count: "exact", head: true });
  if (keyword) {
    query = query.ilike("title", `%${keyword}%`);
  }

  if (topic) {
    query = query.eq("topic_slug", topic);
  }

  if (sorting === "popular") {
    const date = DateTime.now().setZone("Asia/Seoul");
    if (period === "today") {
      query = query.gte("created_at", date.startOf("day").toISO());
    } else if (period === "week") {
      query = query.gte("created_at", date.startOf("week").toISO());
    } else if (period === "month") {
      query = query.gte("created_at", date.startOf("month").toISO());
    } else if (period === "year") {
      query = query.gte("created_at", date.startOf("year").toISO());
    }
  }
  const { count, error } = await query;
  if (error) throw new Error(error.message);
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getPostById = async (
  client: SupabaseClient<Database>,
  postId: number
) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getReplies = async (
  client: SupabaseClient<Database>,
  postId: number
) => {
  const replyQuery = `
    post_reply_id,
    reply,
    created_at,
    user:profiles(
        name,
        avatar,
        username
      )
  `;
  const { data, error } = await client
    .from("post_replies")
    .select(
      `
        ${replyQuery},
        post_replies (
          ${replyQuery}
        )
      `
    )
    .eq("post_id", postId);
  if (error) throw new Error(error.message);
  return data;
};

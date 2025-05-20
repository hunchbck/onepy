import type { MetaFunction as RouterMetaFunction } from "react-router";

export interface Post {
  post_id: number;
  title: string;
  content: string;
  upvotes: number;
  created_at: string;
  topic_id: number;
  profile_id: string;
  topic_slug: string;
  topic_name: string;
  author_name: string;
  author_role: string;
  author_created_at: string;
  products_count: number;
  replies: number;
  author_avatar: string | null;
}

export namespace Route {
  export interface MetaArgs {
    params: {
      postId: string;
    };
  }
  export type MetaFunction = RouterMetaFunction;

  export interface LoaderArgs {
    params: {
      postId: string;
    };
    request: Request;
  }

  export interface ComponentProps {
    loaderData: {
      post: Post;
      replies: Array<{
        post_reply_id: number;
        reply: string;
        created_at: string;
        user: {
          username: string;
          avatar: string | null;
        };
        post_replies: Array<{
          post_reply_id: number;
          reply: string;
          created_at: string;
          user: {
            username: string;
            avatar: string | null;
          };
        }>;
      }>;
    };
  }
}

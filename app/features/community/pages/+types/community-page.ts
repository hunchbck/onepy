export namespace Route {
  export type LoaderArgs = {
    request: Request;
    params: Record<string, string>;
  };

  export type ComponentProps = {
    loaderData: {
      topics: { name: string; slug: string }[];
      posts: {
        post_id: number;
        title: string;
        created_at: string;
        topic: string;
        author: string;
        author_avatar: string | null;
        upvotes: number;
      }[];
      totalPages: number;
    };
  };

  export type MetaArgs = {
    params: Record<string, string>;
  };

  export type MetaFunction = () => Array<
    { title: string } | { name: string; content: string }
  >;
}

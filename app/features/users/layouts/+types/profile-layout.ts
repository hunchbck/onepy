export namespace Route {
  export interface ComponentProps {
    params: {
      username: string;
    };
    loaderData: {
      name: string;
      username: string;
      avatar: string | null;
      role: string;
      followers_count: number;
      following_count: number;
      created_at: string;
      headline: string | null;
      bio: string | null;
    };
  }

  export interface LoaderArgs {
    params: {
      username: string;
    };
    request: Request;
  }
}

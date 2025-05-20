export namespace Route {
  export interface MetaArgs {
    data: Awaited<ReturnType<typeof import("../../queries").getUserPosts>>;
  }

  export interface MetaFunction {
    (
      args: MetaArgs
    ): Array<{ title: string } | { name: string; content: string }>;
  }

  export interface LoaderArgs {
    params: {
      username: string;
    };
    request: Request;
  }

  export interface ComponentProps {
    loaderData: Awaited<
      ReturnType<typeof import("../../queries").getUserPosts>
    >;
  }
}

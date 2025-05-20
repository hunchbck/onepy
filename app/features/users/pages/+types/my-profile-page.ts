export namespace Route {
  export interface MetaArgs {
    data: Awaited<ReturnType<typeof import("../../queries").getUserById>>;
  }

  export interface MetaFunction {
    (
      args: MetaArgs
    ): Array<{ title: string } | { name: string; content: string }>;
  }

  export interface LoaderArgs {
    request: Request;
  }

  export interface ComponentProps {
    loaderData: {
      profile: Awaited<ReturnType<typeof import("../../queries").getUserById>>;
    };
  }
}

export namespace Route {
  export interface ComponentProps {
    loaderData: {
      topics: Awaited<ReturnType<typeof import("../../queries").getTopics>>;
    };
    actionData?: {
      fieldErrors?: {
        title?: string[];
        category?: string[];
        content?: string[];
      };
    };
  }

  export interface MetaArgs {
    data: unknown;
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

  export interface ActionArgs {
    request: Request;
  }
}

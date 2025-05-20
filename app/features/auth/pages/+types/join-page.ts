export namespace Route {
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

  export interface ComponentProps {
    loaderData: unknown;
    actionData?: {
      formErrors?: {
        name?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
      };
      signUpError?: string;
    };
  }
}

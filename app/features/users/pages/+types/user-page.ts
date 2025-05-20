export namespace Route {
  export interface ComponentProps {
    params: {
      username: string;
    };
  }

  export interface MetaArgs {
    params: {
      username: string;
    };
  }

  export interface MetaFunction {
    (): Array<{ title: string } | { name: string; content: string }>;
  }
}

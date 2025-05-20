export namespace Route {
  export interface ComponentProps {
    params: {
      messageId: string;
    };
  }

  export interface MetaArgs {
    params: {
      messageId: string;
    };
  }

  export interface MetaFunction {
    (): Array<{ title: string } | { name: string; content: string }>;
  }
}

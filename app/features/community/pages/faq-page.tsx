import type { Route } from "../../../routes/+types/community";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => ({
  title: "자주 묻는 질문(FAQ)"
});

export function FaqPage({ loaderData, actionData }: Router.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-bold">자주 묻는 질문(FAQ)</h1>
      {/* FAQ 내용 추가 */}
    </div>
  );
}

export { FaqPage as default };

import type { Route } from "../../../routes/+types/community";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => ({
  title: "문의하기"
});

export function ContactPage({ loaderData, actionData }: Router.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-bold">문의하기</h1>
      {/* 문의 폼 또는 안내 내용 추가 */}
    </div>
  );
}

export { ContactPage as default };

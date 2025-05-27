import { LoaderCircle } from "lucide-react";
import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { AuthButtons } from "../components/auth-buttons";
import { checkUsernameExists } from "../queries";
import type { Route } from "./+types/join-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Join | wemake" },
    { name: "description", content: "Create your account" },
  ];
};

const formSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      signUpError: null,
      formErrors: error.flatten().fieldErrors,
    };
  }
  const usernameExists = await checkUsernameExists(request, {
    username: data.username,
  });
  if (usernameExists) {
    return {
      signUpError: null,
      formErrors: { username: ["Username already exists"] },
    };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: { name: data.name, username: data.username } },
  });
  if (signUpError) {
    return {
      formErrors: null,
      signUpError: signUpError.message,
    };
  }
  return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <Button variant="ghost" asChild className="absolute top-8 right-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-semibold">회원가입</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="name"
            label="이름"
            name="name"
            type="text"
            placeholder="이름을 입력하세요"
            description="이름을 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.name}</p>
          )}
          <InputPair
            id="username"
            label="사용자명"
            name="username"
            type="text"
            placeholder="예: wemake"
            description="사용자명을 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.username}</p>
          )}
          <InputPair
            id="email"
            label="이메일"
            name="email"
            type="email"
            placeholder="예: john@doe.com"
            description="이메일 주소를 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.email}</p>
          )}
          <InputPair
            id="password"
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            description="비밀번호를 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.password}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "가입 할래요~"
            )}
          </Button>
          {actionData && "signUpError" in actionData && (
            <p className="text-red-500">{actionData.signUpError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}

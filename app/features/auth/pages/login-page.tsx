import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";
import { ButtonSubmitting } from "~/common/components/button-submitting";
import InputPair from "~/common/components/input-pair";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "~/common/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import { SocialLogin } from "../components/social-login";
import type { Route } from "./+types/login-page";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const formSchema = z.object({
  email: z
    .string({
      required_error: "이메일을 입력해 주세요.",
      invalid_type_error: "이메일은 문자열이어야 합니다."
    })
    .email("유효한 이메일 주소를 입력해 주세요."),
  password: z
    .string({
      required_error: "비밀번호를 입력해 주세요.",
      invalid_type_error: "비밀번호는 문자열이어야 합니다."
    })
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
});

export const meta: Route.MetaFunction = () => {
  return [
    { title: "로그인 | 한평" },
    { name: "description", content: "한평 로그인" }
  ];
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      loginError: null,
      formErrors: error.flatten().fieldErrors
    };
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { data: loginData, error: loginError } =
    await client.auth.signInWithPassword({
      email,
      password
    });
  if (loginError) {
    let message = loginError.message;
    if (message.includes("Invalid login credentials")) {
      message = "이메일 또는 비밀번호가 올바르지 않습니다.";
    }
    return {
      formErrors: null,
      loginError: message
    };
  }
  if (!loginData.user?.id) {
    return {
      formErrors: null,
      loginError: "유저 정보를 찾을 수 없습니다."
    };
  }
  return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex h-auto min-h-0 flex-col items-center justify-start overflow-x-hidden bg-gray-50 px-4 py-0 sm:px-6 lg:px-8">
      <div className="mt-8 w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link
            to="/"
            className="mb-8 flex items-center justify-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <span className="font-bold text-white">한</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">한평</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-sm text-gray-600">
            아직 계정이 없으신가요?{" "}
            <Link
              to="/auth/join"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              회원가입
            </Link>
          </p>
        </div>
        {/* Social Login */}
        <SocialLogin />
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              계정에 로그인
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              이메일과 비밀번호를 입력해 주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <InputPair
                id="email"
                label="이메일"
                name="email"
                type="email"
                placeholder="이메일을 입력하세요"
                required
                error={
                  Array.isArray(actionData?.formErrors?.email)
                    ? actionData.formErrors.email.join(" ")
                    : actionData?.formErrors?.email
                }
              />
              <div className="space-y-1">
                <InputPair
                  id="password"
                  label="비밀번호"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  error={
                    Array.isArray(actionData?.formErrors?.password)
                      ? actionData.formErrors.password.join(" ")
                      : actionData?.formErrors?.password
                  }
                />
                <div className="flex justify-end">
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs font-normal text-blue-600 hover:underline"
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
              </div>
              <ButtonSubmitting
                isSubmitting={isSubmitting}
                message="로그인"
                type="submit"
              />
              {actionData && "loginError" in actionData && (
                <Alert variant="destructive">
                  <AlertTitle>로그인 에러!</AlertTitle>
                  <AlertDescription>{actionData.loginError}</AlertDescription>
                </Alert>
              )}
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

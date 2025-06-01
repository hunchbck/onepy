import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";
import { ButtonSubmitting } from "~/common/components/button-submitting";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { AuthButtons } from "../components/auth-buttons";
import { checkNicknameExists } from "../queries";
import type { Route } from "./+types/join-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Join | wemake" },
    { name: "description", content: "Create your account" }
  ];
};

const formSchema = z
  .object({
    name: z
      .string({
        required_error: "이름을 입력해 주세요.",
        invalid_type_error: "이름은 문자열이어야 합니다."
      })
      .min(1, { message: "이름을 입력해 주세요." }),
    nickname: z
      .string({
        required_error: "닉네임을 입력해 주세요.",
        invalid_type_error: "닉네임은 문자열이어야 합니다."
      })
      .min(2, { message: "닉네임은 2자 이상이어야 합니다." }),
    phone: z
      .string({
        required_error: "전화번호를 입력해 주세요.",
        invalid_type_error: "전화번호는 문자열이어야 합니다."
      })
      .min(10, { message: "전화번호는 10자리 이상이어야 합니다." }),
    email: z
      .string({
        required_error: "이메일을 입력해 주세요.",
        invalid_type_error: "이메일은 문자열이어야 합니다."
      })
      .email({ message: "유효한 이메일 주소를 입력해 주세요." }),
    password: z
      .string({
        required_error: "비밀번호를 입력해 주세요.",
        invalid_type_error: "비밀번호는 문자열이어야 합니다."
      })
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
    passwordConfirm: z
      .string({
        required_error: "비밀번호 확인을 입력해 주세요.",
        invalid_type_error: "비밀번호 확인은 문자열이어야 합니다."
      })
      .min(8, { message: "비밀번호 확인은 8자 이상이어야 합니다." })
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"]
  });

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      signUpError: null,
      formErrors: error.flatten().fieldErrors
    };
  }

  // 입력값 정제: phone은 숫자만 남김
  const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "");

  const nicknameExists = await checkNicknameExists(request, {
    nickname: data.nickname
  });
  if (nicknameExists) {
    return {
      signUpError: null,
      formErrors: { nickname: ["닉네임이 이미 존재합니다"] }
    };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        nickname: data.nickname,
        phone: cleanPhone
      }
    }
  });
  if (signUpError) {
    return {
      formErrors: null,
      signUpError: signUpError.message
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
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.email}</p>
          )}
          <InputPair
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
          />
          <InputPair
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 확인하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.password}</p>
          )}
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData.formErrors?.passwordConfirm}
            </p>
          )}
          <InputPair
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.name}</p>
          )}
          <InputPair
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.nickname}</p>
          )}
          <InputPair
            id="phone"
            name="phone"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="전화번호를 입력하세요"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.phone}</p>
          )}
          <ButtonSubmitting
            isSubmitting={isSubmitting}
            message="가입 할래요"
            type="submit"
          />
          {actionData && "signUpError" in actionData && (
            <p className="text-red-500">{actionData.signUpError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}

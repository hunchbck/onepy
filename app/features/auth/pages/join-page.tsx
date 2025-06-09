import { Terminal } from "lucide-react";
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
import { Checkbox } from "~/common/components/ui/checkbox";
import { Label } from "~/common/components/ui/label";
import { Separator } from "~/common/components/ui/separator";
import { makeSSRClient } from "~/supa-client";
import { SocialLogin } from "../components/social-login";
import { checkNicknameExists } from "../queries";
import type { Route } from "./+types/join-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "회원가입 | 한평" },
    { name: "description", content: "한평 회원가입" }
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
      .min(2, { message: "닉네임은 2자 이상이어야 합니다." })
      .refine((val) => !/^Onepy/i.test(val), {
        message: "닉네임은 'Onepy'로 시작할 수 없습니다."
      })
      .refine((val) => !/^Kakao/i.test(val), {
        message: "닉네임은 'Kakao'로 시작할 수 없습니다."
      })
      .refine((val) => !/^Google/i.test(val), {
        message: "닉네임은 'Google'로 시작할 수 없습니다."
      })
      .refine((val) => !/^Apple/i.test(val), {
        message: "닉네임은 'Apple'로 시작할 수 없습니다."
      }),
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
      .min(8, { message: "비밀번호 확인은 8자 이상이어야 합니다." }),
    agreeTerms: z
      .any()
      .transform((val) => val === "on" || val === true)
      .refine((val) => val === true, { message: "이용약관에 동의해 주세요." }),
    agreePrivacy: z
      .any()
      .transform((val) => val === "on" || val === true)
      .refine((val) => val === true, {
        message: "개인정보처리방침에 동의해 주세요."
      })
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
    console.log("success 실패", error.flatten().fieldErrors);
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
    console.log("닉네임 중복 체크 실패");
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
    let message = signUpError.message;
    if (message.includes("User already registered")) {
      message = "이미 가입된 이메일입니다.";
    }
    console.log("signUpError", message);
    return {
      formErrors: null,
      signUpError: message
    };
  }
  return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
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
          <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              로그인
            </Link>
          </p>
        </div>
        {/* Social Login */}
        <SocialLogin />

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">계정 정보</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              한평 서비스 이용을 위한 기본 정보를 입력해 주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              {/* Email */}
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
              {/* Password */}
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
              {/* Password Confirm */}
              <InputPair
                id="passwordConfirm"
                label="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호를 확인하세요"
                required
                error={
                  Array.isArray(actionData?.formErrors?.passwordConfirm)
                    ? actionData.formErrors.passwordConfirm.join(" ")
                    : actionData?.formErrors?.passwordConfirm
                }
              />

              <div className="space-y-6">
                <Separator />
                <div>
                  <h3 className="mb-1 text-lg font-semibold">개인 정보</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    실제 사용자 정보를 입력해 주세요
                  </p>
                  <InputPair
                    id="name"
                    label="이름"
                    name="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    required
                    error={
                      Array.isArray(actionData?.formErrors?.name)
                        ? actionData.formErrors.name.join(" ")
                        : actionData?.formErrors?.name
                    }
                  />
                  <InputPair
                    id="nickname"
                    label="닉네임"
                    name="nickname"
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    required
                    error={
                      Array.isArray(actionData?.formErrors?.nickname)
                        ? actionData.formErrors.nickname.join(" ")
                        : actionData?.formErrors?.nickname
                    }
                  />
                  <InputPair
                    id="phone"
                    label="전화번호"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="전화번호를 입력하세요"
                    error={
                      Array.isArray(actionData?.formErrors?.phone)
                        ? actionData.formErrors.phone.join(" ")
                        : actionData?.formErrors?.phone
                    }
                  />
                </div>
                <Separator />
                <div>
                  <h3 className="mb-1 text-lg font-semibold">이용약관 동의</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    서비스 이용을 위해 아래 약관에 동의해 주세요
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="agreeTerms" name="agreeTerms" required />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="agreeTerms"
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          이용약관에 동의합니다 (필수)
                        </Label>
                        <Link
                          to="/terms"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          이용약관 보기
                        </Link>
                      </div>
                    </div>
                    {Array.isArray(actionData?.formErrors?.agreeTerms)
                      ? actionData.formErrors.agreeTerms.map((msg, i) => (
                          <p key={i} className="text-xs text-red-500">
                            {msg}
                          </p>
                        ))
                      : actionData?.formErrors?.agreeTerms && (
                          <p className="text-xs text-red-500">
                            {actionData.formErrors.agreeTerms}
                          </p>
                        )}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreePrivacy"
                        name="agreePrivacy"
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="agreePrivacy"
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          개인정보처리방침에 동의합니다 (필수)
                        </Label>
                        <Link
                          to="/privacy"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          개인정보처리방침 보기
                        </Link>
                      </div>
                    </div>
                    {Array.isArray(actionData?.formErrors?.agreePrivacy)
                      ? actionData.formErrors.agreePrivacy.map((msg, i) => (
                          <p key={i} className="text-xs text-red-500">
                            {msg}
                          </p>
                        ))
                      : actionData?.formErrors?.agreePrivacy && (
                          <p className="text-xs text-red-500">
                            {actionData.formErrors.agreePrivacy}
                          </p>
                        )}
                  </div>
                </div>
              </div>

              <ButtonSubmitting
                isSubmitting={isSubmitting}
                message="가입할래요"
              />
              {actionData && "signUpError" in actionData && (
                <Alert variant="destructive">
                  <Terminal />
                  <AlertTitle>회원가입 에러!</AlertTitle>
                  <AlertDescription>
                    ---{actionData.signUpError}---
                  </AlertDescription>
                </Alert>
              )}
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

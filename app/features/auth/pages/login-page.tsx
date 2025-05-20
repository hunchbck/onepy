import { LoaderCircle } from "lucide-react";
import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { AuthButtons } from "../components/auth-buttons";
import type { Route } from "./+types/login-page";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Login | wemake" },
    { name: "description", content: "Login to your account" }
  ];
};

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string"
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be a string"
    })
    .min(8, { message: "Password must be at least 8 characters" })
});

export const action = async ({ request }: Route.ActionArgs) => {
  // await sleep(4000);
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
  const { data: user, error: loginError } =
    await client.auth.signInWithPassword({
      email,
      password
    });
  if (loginError) {
    return {
      formErrors: null,
      loginError: loginError.message
    };
  }
  return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="email"
            label="Email"
            name="email"
            type="email"
            placeholder="i.e. john@doe.com"
            description="Enter your email address"
            required
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData.formErrors && (
              <p className="text-sm text-red-500">
                {actionData.formErrors.email?.join(", ")}
              </p>
            )}
          <InputPair
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            description="Enter your password"
            required
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData.formErrors && (
              <p className="text-sm text-red-500">
                {actionData.formErrors.password?.join(", ")}
              </p>
            )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Login"}
          </Button>
          {actionData && "loginError" in actionData && (
            <p className="text-sm text-red-500">{actionData.loginError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}

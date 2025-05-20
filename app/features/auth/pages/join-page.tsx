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
    { name: "description", content: "Create your account" }
  ];
};

const formSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
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
  const usernameExists = await checkUsernameExists(request, {
    username: data.username
  });
  if (usernameExists) {
    return {
      signUpError: null,
      formErrors: { username: ["Username already exists"] }
    };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: { name: data.name, username: data.username } }
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
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="name"
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            description="Enter your name"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.name}</p>
          )}
          <InputPair
            id="username"
            label="Username"
            name="username"
            type="text"
            placeholder="i.e wemake"
            description="Enter your username"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.username}</p>
          )}
          <InputPair
            id="email"
            label="Email"
            name="email"
            type="email"
            placeholder="i.e. john@doe.com"
            description="Enter your email address"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.email}</p>
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
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{actionData.formErrors?.password}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Create account"
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

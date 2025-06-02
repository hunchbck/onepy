import { LoaderCircle } from "lucide-react";
import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import { z } from "zod";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/otp-start-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Verify OTP | wemake" },
    { name: "description", content: "Verify OTP" }
  ];
};

const formSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6)
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { email, otp } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: "email"
  });
  if (verifyError) {
    return { verifyError: verifyError.message };
  }
  return redirect("/", { headers });
};

export default function OtpPage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-muted-foreground text-sm">
            We will send a 4-digit code to log in to your account.
          </p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="email"
            label="Email"
            name="email"
            defaultValue={email ?? ""}
            type="email"
            placeholder="i.e. john@doe.com"
            description="Enter your email address"
            required
          />
          {actionData?.fieldErrors?.email && (
            <p className="text-red-500">
              {actionData.fieldErrors.email?.join(", ")}
            </p>
          )}
          <InputPair
            id="otp"
            label="OTP"
            name="otp"
            type="number"
            placeholder="i.e 1234"
            description="Enter your OTP"
            required
          />
          {actionData?.fieldErrors?.otp && (
            <p className="text-red-500">
              {actionData.fieldErrors.otp?.join(", ")}
            </p>
          )}
          {actionData?.verifyError && (
            <p className="text-red-500">{actionData.verifyError}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

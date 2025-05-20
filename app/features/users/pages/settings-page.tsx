import { useState } from "react";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import type { Route } from "./+types/settings-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Settings | wemake" },
    { name: "description", content: "Manage your account settings" }
  ];
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files?.[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex w-1/2 flex-col gap-5">
            <InputPair
              id="name"
              label="Name"
              name="name"
              description="Your public name"
              placeholder="i.e. John Doe"
              required
            />
            <SelectPair
              label="Role"
              name="role"
              description="what role do you do identify with?"
              placeholder="Select a role"
              required
              options={[
                { label: "Software Engineer", value: "software_engineer" },
                { label: "Product Manager", value: "product_manager" },
                { label: "Designer", value: "designer" },
                { label: "Other", value: "other" }
              ]}
            />
            <InputPair
              id="headline"
              label="Headline"
              name="headline"
              description="An introduction to your profile."
              placeholder="i.e. I'm a software engineer"
              required
              textArea
            />
            <InputPair
              id="bio"
              label="Bio"
              name="bio"
              description="Your public bio. It will be displayed on your profile page."
              placeholder="i.e. I'm a software engineer"
              required
              textArea
            />
            <Button type="submit" className="w-full">
              Update profile
            </Button>
          </Form>
        </div>
        <aside className="col-span-2 rounded-lg border p-6 shadow-md">
          <div className="flex flex-col space-y-5">
            <Label htmlFor="avatar" className="flex flex-col gap-1">
              Avatar
              <small className="text-muted-foreground">
                This is your public avatar.
              </small>
              <div className="size-40 overflow-hidden rounded-full shadow-xl">
                {avatar && (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </Label>
            <Input
              id="avatar"
              type="file"
              name="avatar"
              className="w-1/2"
              onChange={onChange}
              required
            />
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>Recommended size 128×128px</span>
              <span>Allowed formats: PNG, JPG, GIF, SVG</span>
              <span>Max file size: 1MB</span>
            </div>
            <Button type="submit" className="w-full">
              Update avatar
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

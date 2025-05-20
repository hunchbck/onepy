import { Form, redirect } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { createPost } from "../mutations";
import { getTopics } from "../queries";
import type { Route } from "./+types/submit-post-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Post | wemake" },
    { name: "description", content: "Submit a new post" }
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z.string().min(1).max(100),
  category: z.string().min(1).max(100),
  content: z.string().min(1).max(100)
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { title, category, content } = data;
  const { post_id } = await createPost(client, {
    title,
    category,
    content,
    userId
  });
  return redirect(`/community/${post_id}`);
};

export default function SubmitPostPage({
  loaderData,
  actionData
}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Ask questions, share ideas, and connect with other developers"
      />

      <Form
        className="mx-auto flex max-w-screen-md flex-col gap-2 space-y-5"
        method="post"
      >
        <InputPair
          id="title"
          label="Title"
          name="title"
          description="(40 characters or less)"
          placeholder="i.e What is the best productivity tool?"
          required
        />
        {actionData?.fieldErrors?.title && (
          <p className="text-red-500">
            {actionData.fieldErrors.title?.join(", ")}
          </p>
        )}
        <SelectPair
          name="category"
          label="Category"
          description="Select a category for your post"
          placeholder="Select a category"
          options={loaderData.topics.map((topic) => ({
            label: topic.name,
            value: topic.slug
          }))}
          required
        />
        {actionData?.fieldErrors?.category && (
          <p className="text-red-500">
            {actionData.fieldErrors.category?.join(", ")}
          </p>
        )}
        <InputPair
          id="content"
          label="Content"
          name="content"
          description="(1000 characters or less)"
          placeholder="i.e I'm looking for a new productivity tool that can help me stay organized and get more done."
          required
          textArea
        />
        {actionData?.fieldErrors?.content && (
          <p className="text-red-500">
            {actionData.fieldErrors.content?.join(", ")}
          </p>
        )}
        <Button type="submit" className="mx-auto">
          Create Discussion
        </Button>
      </Form>
    </div>
  );
}

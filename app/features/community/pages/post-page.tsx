import { ChevronUpIcon, DotIcon, ReplyIcon } from "lucide-react";
import { DateTime } from "luxon";
import { data, Form, Link } from "react-router";
import { z } from "zod";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "~/common/components/ui/breadcrumb";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import { makeSSRClient } from "~/supa-client";
import Reply from "../components/reply";
import { getPostById, getReplies } from "../queries";
import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post | wemake" },
    { name: "description", content: "View post" }
  ];
};

const paramsSchema = z.object({
  postId: z.coerce.number()
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        error_message: "Invalid post ID"
      },
      { status: 400 }
    );
  }
  const post = await getPostById(client, parsedData.postId);
  const replies = await getReplies(client, parsedData.postId);
  return { post, replies };
};

export default function PostPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/post/${loaderData.post.post_id}`}>
                {loaderData.post.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex h-14 flex-col">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{loaderData.post.upvotes}</span>
            </Button>
            <div className="w-full space-y-20">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className="size-5" />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </span>
                  <DotIcon className="size-5" />
                  <span>{loaderData.post.replies} replies</span>
                </div>
                <p className="w-3/4 text-muted-foreground">
                  {loaderData.post.content}
                </p>
              </div>
              <Form className="flex w-3/4 items-start gap-5">
                <Avatar className="size-14">
                  <AvatarFallback>N</AvatarFallback>
                  <AvatarImage src="https://github.com/microsoft.png" />
                </Avatar>
                <div className="flex w-full flex-col items-end gap-5">
                  <Textarea
                    placeholder="Write a reply"
                    className="w-full resize-none"
                    rows={5}
                  />
                  <Button>Reply</Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {loaderData.post.replies} Replies
                </h4>
                <div className="flex flex-col gap-5">
                  {loaderData.replies.map((reply) => (
                    <Reply
                      username={reply.user.username}
                      name={reply.user.username}
                      avatarUrl={
                        reply.user.avatar ?? "https://github.com/shadcn.png"
                      }
                      content={reply.reply}
                      timestamp={DateTime.fromISO(
                        reply.created_at ?? new Date().toISOString()
                      ).toRelative()}
                      replies={reply.post_replies.map((reply) => ({
                        post_reply_id: reply.post_reply_id,
                        reply: reply.reply,
                        created_at: reply.created_at,
                        user: {
                          name: reply.user.username,
                          avatar: reply.user.avatar,
                          username: reply.user.username
                        },
                        post_replies: []
                      }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 rounded-lg border p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>
                {loaderData.post.author_name.charAt(0)}
              </AvatarFallback>
              {loaderData.post.author_avatar && (
                <AvatarImage src={loaderData.post.author_avatar} />
              )}
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">
                {loaderData.post.author_name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span>
              🍔 Joined{" "}
              {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}
            </span>
            <span>💕 Launched {loaderData.post.products_count} products</span>
          </div>
          <Button variant="outline" className="w-full">
            <ReplyIcon className="size-4" />
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}

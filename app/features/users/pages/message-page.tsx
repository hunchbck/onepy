import { SendIcon } from "lucide-react";
import { Form } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import { Textarea } from "~/common/components/ui/textarea";
import { MessageBubble } from "~/features/users/components/message-bubble";
import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Message | wemake" },
    { name: "description", content: "View message" }
  ];
};

export default function MessagePage() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/stevejobs.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>Steve Jobs</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex h-full flex-col justify-start overflow-y-auto p-10">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <MessageBubble
              avatarUrl="https://github.com/stevejobs.png"
              message="this is a message from steve jobs in iheaven, make sure to reply because if you don't, you will be punished."
            />
            <MessageBubble
              avatarUrl="https://github.com/shadcn.png"
              message="Yes, I will reply right away!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              "
              isCurrentUser
            />
          </div>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex items-center justify-end">
            <Textarea
              placeholder="Write a message here..."
              className="resize-none"
              rows={2}
            />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}

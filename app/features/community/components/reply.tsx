import { ReplyIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { Form } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  avatarUrl: string | null;
  username: string;
  name: string;
  timestamp: string | null;
  content: string;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
    post_replies?: {
      post_reply_id: number;
      reply: string;
      created_at: string;
      user: {
        name: string;
        avatar: string | null;
        username: string;
      };
    }[];
  }[];
}

export default function Reply({
  avatarUrl,
  username,
  name,
  timestamp,
  content,
  replies
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{name[0]}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div>
          <h4>{name}</h4>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </div>
      <p className="text-muted-foreground">{content}</p>
      {timestamp && (
        <span className="text-xs text-muted-foreground">
          {DateTime.fromISO(timestamp).toRelative()}
        </span>
      )}
      {replies && replies.length > 0 && (
        <div className="ml-10 space-y-5">
          {replies.map((reply) => (
            <Reply
              key={reply.post_reply_id}
              avatarUrl={reply.user.avatar}
              username={reply.user.username}
              name={reply.user.name}
              timestamp={reply.created_at}
              content={reply.reply}
              replies={reply.post_replies}
            />
          ))}
        </div>
      )}
      <Button variant="ghost" className="self-end" onClick={toggleReplying}>
        <ReplyIcon className="size-4" />
        Reply
      </Button>
      {replying && (
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
      )}
    </div>
  );
}

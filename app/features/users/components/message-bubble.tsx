import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  avatarUrl: string;
  message: string;
  isCurrentUser?: boolean;
}

export function MessageBubble({
  avatarUrl,
  message,
  isCurrentUser = false
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-4",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar className="size-14">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>N</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "w-1/4 rounded-md p-4 text-sm",
          isCurrentUser
            ? "rounded-br-none bg-accent"
            : "rounded-bl-none bg-primary text-primary-foreground"
        )}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}

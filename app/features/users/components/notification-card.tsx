import { EyeIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  username: string;
  avatarUrl: string;
  avatarFallback?: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export function NotificationCard({
  username,
  avatarUrl,
  avatarFallback,
  message,
  timestamp,
  seen
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[450px]", !seen && "bg-yellow-50")}>
      <CardHeader className="flex flex-row items-start gap-5">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            {avatarFallback || username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{username}</span>
            <span>·</span>
            <span> {message}</span>
          </CardTitle>
          <small className="text-sm text-muted-foreground">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="icon">
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

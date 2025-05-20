import { ChevronUpIcon, DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Link } from "react-router";
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

interface PostCardProps {
  id: number | null;
  title: string | null;
  author: string | null;
  authorAvatarUrl: string | null;
  category: string | null;
  createdAt: string | null;
  expanded?: boolean;
  votesCount?: number | null;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  createdAt,
  expanded = false,
  votesCount = 0
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`} className="block">
      <Card
        className={cn(
          "bg-transparent transition-colors hover:bg-card/50",
          expanded ? "flex flex-row items-center justify-between" : ""
        )}
      >
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14">
            <AvatarFallback>{author?.[0]}</AvatarFallback>
            <AvatarImage src={authorAvatarUrl || undefined} />
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="text-sㅡ flex gap-2 leading-tight text-muted-foreground">
              <span>{author} on</span>
              <span>{category}</span>
              <DotIcon className="h-4 w-4" />
              <span>
                {createdAt ? DateTime.fromISO(createdAt).toRelative() : ""}
              </span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end pb-0">
            <Button variant="outline" className="flex h-14 flex-col">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{votesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/user-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Profile | wemake" },
    { name: "description", content: "View user profile" }
  ];
};

export default function UserPage({
  params: { username }
}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <div className="flex items-center gap-5">
        <Avatar className="size-20">
          <AvatarFallback>L</AvatarFallback>
          <AvatarImage src="https://github.com/inthetiger.png" />
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-2xl font-medium">@{username}</h4>
            <Badge variant="secondary">Entrepreneur</Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Building amazing products
          </p>
        </div>
        <Button variant="outline" className="ml-auto">
          Follow
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="space-y-5">
          <h3 className="text-lg font-medium">Products</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No products yet</p>
          </div>
        </div>
        <div className="space-y-5">
          <h3 className="text-lg font-medium">Teams</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No teams yet</p>
          </div>
        </div>
        <div className="space-y-5">
          <h3 className="text-lg font-medium">Ideas</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No ideas yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

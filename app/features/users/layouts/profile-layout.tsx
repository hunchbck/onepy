import { Form, Link, NavLink, Outlet } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import { makeSSRClient } from "~/supa-client";
import { getUserProfile } from "../queries";
import type { Route } from "./+types/profile-layout";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const user = await getUserProfile(client, params.username);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return user;
};

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          <AvatarImage src={loaderData.avatar ?? undefined} />
          <AvatarFallback className="text-2xl">
            {loaderData.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-5">
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">{loaderData.name}</h1>
            <Button variant="outline" asChild>
              <Link to="/my/settings">Edit profile</Link>
            </Button>
            <Button variant="secondary">Follow</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Message</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                  <span className="text-sm text-muted-foreground">
                    Send a message to John Doe
                  </span>
                  <Form className="space-y-4">
                    <Textarea
                      placeholder="Message"
                      className="resize-none"
                      rows={4}
                    />
                    <Button type="submit">Send</Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              @{loaderData.username}
            </span>
            <Badge variant="secondary">{loaderData.role}</Badge>
            <Badge variant="secondary">
              {loaderData.followers_count} followers
            </Badge>
            <Badge variant="secondary">
              {loaderData.following_count} following
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        {[
          {
            label: "About",
            to: `/users/${loaderData.username}`
          },
          {
            label: "Products",
            to: `/users/${loaderData.username}/products`
          },
          {
            label: "Posts",
            to: `/users/${loaderData.username}/posts`
          }
        ].map((item) => (
          <NavLink
            end
            key={item.label}
            className={({ isActive }) =>
              cn([
                buttonVariants({ variant: "outline" }),
                isActive && "bg-accent text-foreground"
              ])
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-screen-md">
        <Outlet
          context={{ headline: loaderData.headline, bio: loaderData.bio }}
        />
      </div>
    </div>
  );
}

import { PostCard } from "~/features/community/components/post-card";
import { makeSSRClient } from "~/supa-client";
import { getUserPosts } from "../queries";
import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Posts | wemake" },
    { name: "description", content: "View user posts" }
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const posts = await getUserPosts(client, params.username);
  return posts;
}

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {loaderData.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          author={post.user?.name ?? null}
          authorAvatarUrl={post.user?.avatar ?? null}
          category={post.topic?.name ?? null}
          createdAt={post.created_at}
          expanded
          votesCount={post.upvotes ?? 0}
        />
      ))}
    </div>
  );
}

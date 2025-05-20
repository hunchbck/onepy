import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Ideas | wemake" },
    { name: "description", content: "Manage your ideas" }
  ];
};

export default function DashboardIdeasPage() {
  return (
    <div className="h-full space-y-5">
      <h1 className="mb-6 text-2xl font-semibold">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={1}
            title="A startup that creates an AI-powered generated trainer"
            viewsCount={123}
            postedAt={new Date().toISOString()}
            likesCount={45}
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}

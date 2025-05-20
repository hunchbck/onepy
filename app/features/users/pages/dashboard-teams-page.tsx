import { Hero } from "~/common/components/hero";
import { TeamCard } from "~/features/teams/components/team-card";
import type { Route } from "./+types/dashboard-teams-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Teams | wemake" },
    { name: "description", content: "Manage your teams" }
  ];
};

export default function DashboardTeamsPage() {
  return (
    <div className="space-y-20">
      <Hero title="My Teams" subtitle="Manage your teams" />
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <TeamCard
            key={index}
            id={index + 1}
            leaderUsername="lynn"
            leaderAvatarUrl="https://github.com/inthetiger.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Product Manager"
            ]}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  );
}

import { Hero } from "~/common/components/hero";
import { JobCard } from "~/features/jobs/components/job-card";
import type { Route } from "./+types/dashboard-jobs-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Jobs | wemake" },
    { name: "description", content: "Manage your job posts" }
  ];
};

export default function DashboardJobsPage() {
  return (
    <div className="space-y-20">
      <Hero title="My Jobs" subtitle="Manage your job posts" />
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <JobCard
            key={index}
            id={index + 1}
            title="Senior React Developer"
            company="My Company"
            companyLogoUrl="https://github.com/vercel.png"
            companyHq="Remote"
            postedAt="2 days ago"
            type="Full-Time"
            positionLocation="Remote"
            salary="$120,000 - $180,000"
            onResetFilter={() => {}}
            selectedType={null}
            selectedLocation={null}
            selectedSalary={null}
          />
        ))}
      </div>
    </div>
  );
}

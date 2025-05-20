import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import type { ChartConfig } from "~/common/components/ui/chart";
import { ChartContainer } from "~/common/components/ui/chart";
import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Dashboard | wemake" },
    { name: "description", content: "Manage your account" }
  ];
};
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 }
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip cursor={false} />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import type { ChartConfig } from "~/common/components/ui/chart";
import { ChartContainer } from "~/common/components/ui/chart";
import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Products | wemake" },
    { name: "description", content: "Manage your products" }
  ];
};
const chartData = [
  { month: "January", desktop: 186, visitors: 100 },
  { month: "February", desktop: 305, visitors: 34 },
  { month: "March", desktop: 237, visitors: 65 },
  { month: "April", desktop: 73, visitors: 32 },
  { month: "May", desktop: 209, visitors: 66 },
  { month: "June", desktop: 214, visitors: 434 }
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))"
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig;
export default function DashboardProductPage() {
  return (
    <div className="space-y-5">
      <h1 className="mb-6 text-2xl font-semibold">Analytics</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
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
              <Area
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                fill="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="visitors"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

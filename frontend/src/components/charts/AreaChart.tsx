"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", totalEmp: 520, attrition: 0 },
  { date: "2024-04-02", totalEmp: 322, attrition: 28 },
  { date: "2024-04-03", totalEmp: 518, attrition: 2 },
  { date: "2024-04-04", totalEmp: 425, attrition: 25 },
  { date: "2024-04-05", totalEmp: 530, attrition: 9 },
  { date: "2024-04-06", totalEmp: 228, attrition: 31 },
  { date: "2024-04-07", totalEmp: 535, attrition: 4 },
  { date: "2024-04-08", totalEmp: 432, attrition: 26 },
  { date: "2024-04-09", totalEmp: 537, attrition: 7 },
  { date: "2024-04-10", totalEmp: 233, attrition: 29 },
  { date: "2024-04-11", totalEmp: 540, attrition: 2 },
  { date: "2024-04-12", totalEmp: 445, attrition: 20 },
  { date: "2024-04-13", totalEmp: 542, attrition: 3 },
  { date: "2024-04-14", totalEmp: 448, attrition: 19 },
  { date: "2024-04-15", totalEmp: 544, attrition: 1 },
  { date: "2024-04-16", totalEmp: 250, attrition: 17 },
  { date: "2024-04-17", totalEmp: 547, attrition: 0 },
  { date: "2024-04-18", totalEmp: 453, attrition: 16 },
  { date: "2024-04-19", totalEmp: 551, attrition: 8 },
  { date: "2024-04-20", totalEmp: 356, attrition: 15 },
  { date: "2024-04-21", totalEmp: 558, attrition: 6 },
  { date: "2024-04-22", totalEmp: 360, attrition: 14 },
  { date: "2024-04-23", totalEmp: 561, attrition: 5 },
  { date: "2024-04-24", totalEmp: 275, attrition: 18 },
  { date: "2024-04-25", totalEmp: 565, attrition: 3 },
  { date: "2024-04-26", totalEmp: 380, attrition: 12 },
  { date: "2024-04-27", totalEmp: 569, attrition: 4 },
  { date: "2024-04-28", totalEmp: 298, attrition: 21 },
  { date: "2024-04-29", totalEmp: 572, attrition: 2 },
  { date: "2024-04-30", totalEmp: 310, attrition: 19 },
];

const chartConfig = {
  employees: {
    label: "Total Employees",
    color: "#3b82f6",
  },
  attrition: {
    label: "Attrition",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="shadow-[0_0_10px_rgba(0,0,0,0.25)] border-none">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Employee Stats Over Time</CardTitle>
          <CardDescription>
            Total employees and attrition trends for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillEmployees" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillAttrition" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="totalEmp"
              type="natural"
              fill="url(#fillEmployees)"
              stroke="#3b82f6"
              stackId="a"
            />
            <Area
              dataKey="attrition"
              type="natural"
              fill="url(#fillAttrition)"
              stroke="#60a5fa"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

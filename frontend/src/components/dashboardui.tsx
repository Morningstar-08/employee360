import { Card, CardContent } from "@/components/ui/card";
import { ChartDoughnut } from "@/components/charts/PieChart";
import { ChartBar } from "@/components/charts/ChartBar";
import { ChartBarHorizontal } from "@/components/charts/ChartHorizontalBar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Component } from "./charts/AreaChart";
const chartColors = ["#3b82f6", "#60a5fa"];

const jobStatsData = [
  { name: "Jan", Total: 60, Attrition: 50 },
  { name: "Feb", Total: 80, Attrition: 60 },
  { name: "Mar", Total: 90, Attrition: 70 },
  { name: "Apr", Total: 75, Attrition: 65 },
  { name: "May", Total: 50, Attrition: 45 },
  { name: "Jun", Total: 70, Attrition: 60 },
  { name: "Jul", Total: 85, Attrition: 70 },
  { name: "Aug", Total: 100, Attrition: 77 },
  { name: "Sep", Total: 90, Attrition: 65 },
  { name: "Oct", Total: 70, Attrition: 60 },
  { name: "Nov", Total: 65, Attrition: 50 },
  { name: "Dec", Total: 85, Attrition: 70 },
];

// Chart datasets
const genderAttritionData = [
  { name: "Male Attrition", value: 180 },
  { name: "Female Attrition", value: 120 },
];

const jobLevelData = [
  { name: "Lvl-1", value: 80 },
  { name: "Lvl-2", value: 60 },
  { name: "Lvl-3", value: 40 },
  { name: "Lvl-4", value: 30 },
  { name: "Lvl-5", value: 20 },
];

const ageGroupData = [
  { name: "<25", value: 30 },
  { name: "25-34", value: 80 },
  { name: "35-44", value: 60 },
  { name: "45-54", value: 40 },
  { name: "55+", value: 20 },
];

const jobSatisfactionData = [
  { name: "1", value: 40 },
  { name: "2", value: 60 },
  { name: "3", value: 90 },
  { name: "4", value: 45 },
];

const yearsSincePromotionData = [
  { name: "0", value: 100 },
  { name: "1-2", value: 70 },
  { name: "3-4", value: 40 },
  { name: "5+", value: 25 },
];

export default function DashboardUI() {
  return (
    <div className="p-3 space-y-6">
      {/* Metrics Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Doughnut: Gender vs Attrition */}
        <ChartDoughnut title="Gender vs Attrition" data={genderAttritionData} />
        <ChartBarHorizontal
          title="Attrition by Age Group"
          data={ageGroupData}
        />
        {/* Bar: Attrition by Job Level */}
        <ChartBar title="Attrition by Job Level" data={jobLevelData} />

        {/* Bar: Attrition by Training Times Last Year */}
        <ChartBar
          title="Attrition by Last Promotion"
          data={yearsSincePromotionData}
        />

        {/* Bar: Attrition by Job Satisfaction */}
        <ChartBar
          title="Attrition by Job Satisfaction"
          data={jobSatisfactionData}
        />
      </div>
      <Component />
      {/* Monthly Job Stats */}
      <Card className="shadow-[0_0_10px_rgba(0,0,0,0.25)] border border-gray-100">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            Monthly Attrition Statistics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobStatsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Attrition" stackId="a" fill={chartColors[0]} />
              <Bar dataKey="Total" stackId="a" fill={chartColors[1]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

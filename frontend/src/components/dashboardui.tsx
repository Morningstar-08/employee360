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
import { AreaChartComponent } from "./charts/AreaChart";
const chartColors = ["#3b82f6", "#60a5fa"];
import { useEffect, useState } from "react";
import { getAllEmployees } from "@/services/apiEmployee";
import { Employee } from "@/services/apiEmployee";

//

export default function DashboardUI() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employee data", err);
      }
    };

    fetchEmployees();
  }, []);

  const genderAttritionData = [
    {
      name: "Male Attrition",
      value: employees.filter(
        (e) => e.Gender === "Male" && e.attrition === "Yes"
      ).length,
    },
    {
      name: "Female Attrition",
      value: employees.filter(
        (e) => e.Gender === "Female" && e.attrition === "Yes"
      ).length,
    },
  ];

  // ✅ Chart 2: Attrition by Age Group
  const ageGroupData = [
    {
      name: "<25",
      value: employees.filter(
        (e) => e.attrition === "Yes" && Number(e.Age) < 25
      ).length,
    },
    {
      name: "25-34",
      value: employees.filter(
        (e) =>
          e.attrition === "Yes" && Number(e.Age) >= 25 && Number(e.Age) < 35
      ).length,
    },
    {
      name: "35-44",
      value: employees.filter(
        (e) =>
          e.attrition === "Yes" && Number(e.Age) >= 35 && Number(e.Age) < 45
      ).length,
    },
    {
      name: "45-54",
      value: employees.filter(
        (e) =>
          e.attrition === "Yes" && Number(e.Age) >= 45 && Number(e.Age) < 55
      ).length,
    },
    {
      name: "55+",
      value: employees.filter(
        (e) => e.attrition === "Yes" && Number(e.Age) >= 55
      ).length,
    },
  ];

  // ✅ Chart 3: Attrition by Job Level
  const jobLevelData = [1, 2, 3, 4, 5].map((level) => ({
    name: `Lvl-${level}`,
    value: employees.filter(
      (e) => e.JobLevel === level && e.attrition === "Yes"
    ).length,
  }));

  // ✅ Chart 4: Attrition by Years Since Last Promotion
  const yearsSincePromotionData = [
    {
      name: "0",
      value: employees.filter(
        (e) => e.attrition === "Yes" && e.YearsSinceLastPromotion === 0
      ).length,
    },
    {
      name: "1-2",
      value: employees.filter(
        (e) =>
          e.attrition === "Yes" &&
          Number(e.YearsSinceLastPromotion) >= 1 &&
          Number(e.YearsSinceLastPromotion) <= 2
      ).length,
    },
    {
      name: "3-4",
      value: employees.filter(
        (e) =>
          e.attrition === "Yes" &&
          Number(e.YearsSinceLastPromotion) >= 3 &&
          Number(e.YearsSinceLastPromotion) <= 4
      ).length,
    },
    {
      name: "5+",
      value: employees.filter(
        (e) => e.attrition === "Yes" && Number(e.YearsSinceLastPromotion) >= 5
      ).length,
    },
  ];

  // ✅ Chart 5: Attrition by Job Satisfaction
  const jobSatisfactionData = [1, 2, 3, 4].map((level) => ({
    name: `${level}`,
    value: employees.filter(
      (e) => e.JobSatisfaction === level && e.attrition === "Yes"
    ).length,
  }));

  // ✅ Chart 6: Monthly Attrition using leavingMonth
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const jobStatsData = months.map((month) => {
    const total = employees.filter((e) => e.leavingMonth === month).length;
    const attrition = employees.filter(
      (e) => e.attrition === "Yes" && e.leavingMonth === month
    ).length;
    return { name: month, Total: total + 10, Attrition: attrition }; // optional +10 to show contrast visually
  });

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
      <AreaChartComponent />
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

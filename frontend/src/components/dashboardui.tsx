// dashboardui.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  PieChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

// const compositionData = [
//   { name: "Female", value: 35 },
//   { name: "Male", value: 65 },
// ];

const metrics = [
  { label: "Total Employees", value: 1267, change: "+10.0%", positive: true },
  { label: "Total Attrition", value: "234", change: "+22.0%", positive: true },
  { label: "Attrition %", value: "12%", change: "+2.0%", positive: true },
  { label: "Average Age", value: 37, change: "-2.0%", positive: false },
  {
    label: "Average Monthly Income",
    value: "$5347",
    change: "-7.0%",
    positive: false,
  },
];

export default function DashboardUI() {
  return (
    <div className="p-3 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric, idx) => (
          <Card
            key={idx}
            className="shadow-[0_0_10px_rgba(0,0,0,0.25)] border border-gray-100"
          >
            <CardContent className="p-4 space-y-1">
              <div className="text-lg text-gray-700 flex justify-between items-center">
                <span>{metric.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    metric.positive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-3xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Statistics */}
      <Card className="shadow-[0_0_10px_rgba(0,0,0,0.25)] border border-gray-100">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Attrition Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobStatsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Attrition" stackId="a" fill="#4f46e5" />
              <Bar dataKey="Total" stackId="a" fill="#aeb8ff" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Attrition Pie Charts */}
      <div className="grid grid-cols-5 gap-4">
        {[
          {
            title: "Distribution of Attrition",
            data: [
              { name: "False", value: 1233 },
              { name: "True", value: 237 },
            ],
            colors: ["#3b82f6", "#60a5fa"],
          },
          {
            title: "Attrition by Environment Satisfaction",
            data: [
              { name: "Satisfied", value: 899 },
              { name: "Dissatisfied", value: 571 },
            ],
            colors: ["#3b82f6", "#1e3a8a"],
          },
          {
            title: "Attrition by Job Satisfaction",
            data: [
              { name: "Satisfied", value: 901 },
              { name: "Dissatisfied", value: 569 },
            ],
            colors: ["#4f46e5", "#818cf8"],
          },
          {
            title: "Attrition by Work-Life Balance",
            data: [
              { name: "Good", value: 1046 },
              { name: "Poor", value: 424 },
            ],
            colors: ["#3b82f6", "#1e3a8a"],
          },
          {
            title: "Employee Composition",
            data: [
              { name: "Male", value: 1046 },
              { name: "Female", value: 424 },
            ],
            colors: ["#3b82f6", "#1e3a8a"],
          },
        ].map((chart, idx) => (
          <Card
            key={idx}
            className="shadow-[0_0_10px_rgba(0,0,0,0.25)] border border-gray-100"
          >
            <CardContent className="p-4">
              <h2 className="text-md font-semibold mb-2 text-center">
                {chart.title}
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {chart.data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={chart.colors[index % chart.colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

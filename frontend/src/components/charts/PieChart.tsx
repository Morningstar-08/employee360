import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const chartColors = ["#3b82f6", "#60a5fa", "#a5b4fc", "#dbeafe"];

type ChartDataItem = {
  name: string;
  value: number;
};

interface ChartDoughnutProps {
  title: string;
  data: ChartDataItem[];
  colors?: string[];
}

export function ChartDoughnut({
  title,
  data,
  colors = chartColors,
}: ChartDoughnutProps) {
  return (
    <Card className="shadow-[0_0_10px_rgba(0,0,0,0.25)] border border-gray-100">
      <CardContent className="p-4">
        <h2 className="text-md font-semibold mb-2 text-center">{title}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

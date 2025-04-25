import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const chartColors = ["#3b82f6", "#60a5fa"];

type ChartDataItem = {
  name: string;
  value: number;
};

interface ChartBarProps {
  title: string;
  data: ChartDataItem[];
  color?: string;
}

export function ChartBarHorizontal({
  title,
  data,
  color = chartColors[0],
}: ChartBarProps) {
  return (
    <Card className="shadow-[0_0_10px_rgba(0,0,0,0.25)] border border-gray-100">
      <CardContent className="p-4">
        <h2 className="text-md font-semibold mb-2 text-center">{title}</h2>
        <ResponsiveContainer width="100%" height={data.length * 45}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: "12px" }} />
            <Bar dataKey="value" fill={color} barSize={35}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

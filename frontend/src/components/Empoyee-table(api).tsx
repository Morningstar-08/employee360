import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Employee = {
  id: string;
  name: string;
  department: string;
  employmentType: "Full Time" | "Part Time";
  attritionStatus: "Low Risk" | "Medium Risk" | "High Risk";
  environmentSatisfaction: number;
  overtimeHours: number;
};

const getBadgeColor = (status: Employee["attritionStatus"]) => {
  switch (status) {
    case "Low Risk":
      return "bg-green-100 text-green-800";
    case "Medium Risk":
      return "bg-yellow-100 text-yellow-800";
    case "High Risk":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees"); // Replace with your API URL
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employee data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p className="p-4">Loading employee data...</p>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Employment Type</TableHead>
            <TableHead>Attrition Status</TableHead>
            <TableHead>Environment Satisfaction</TableHead>
            <TableHead>Overtime (hrs)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.employmentType}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                    emp.attritionStatus
                  )}`}
                >
                  {emp.attritionStatus}
                </span>
              </TableCell>
              <TableCell>{emp.environmentSatisfaction}/5</TableCell>
              <TableCell>{emp.overtimeHours} hrs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

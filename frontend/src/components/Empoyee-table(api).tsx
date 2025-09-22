import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Employee,
  exportToExcel,
  getAllEmployees,
} from "@/services/apiEmployee";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
const getBadgeColor = (status: Employee["attritionRiskLevel"]) => {
  switch (status) {
    case "low_risk":
      return "bg-green-100 text-green-800";
    case "medium_risk":
      return "bg-yellow-100 text-yellow-800";
    case "high_risk":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

export default function EmployeeTableApi() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [jobrolefilter, setJobroleFilter] = useState("");
  const [attritionFilter, setAttritionFilter] = useState("");
  const totalEmployees = employees.length;
  const totalAttrition = employees.filter(
    (emp) => emp.attrition === "Yes"
  ).length;

  // Avoid division by zero
  const attritionPercentage = totalEmployees
    ? ((totalAttrition / totalEmployees) * 100).toFixed(1)
    : "0";

  // Compute average age
  const averageAge = totalEmployees
    ? Math.round(
        employees.reduce((sum, emp) => sum + Number(emp.Age), 0) /
          totalEmployees
      )
    : 0;

  // Compute average income
  const averageIncome = totalEmployees
    ? Math.round(
        employees.reduce((sum, emp) => sum + Number(emp.MonthlyIncome), 0) /
          totalEmployees
      )
    : 0;

  // Optionally hardcode or compute change % vs previous snapshot if you store history

  const metrics = [
    {
      label: "Total Employees",
      value: totalEmployees,
      change: "+10.0%", // you can make this dynamic later
      positive: true,
    },
    {
      label: "Total Attrition",
      value: totalAttrition,
      change: "+22.0%", // placeholder
      positive: true,
    },
    {
      label: "Attrition %",
      value: `${attritionPercentage}%`,
      change: "+2.0%", // placeholder
      positive: true,
    },
    {
      label: "Average Age",
      value: averageAge,
      change: "-2.0%", // placeholder
      positive: false,
    },
    {
      label: "Average Monthly Income",
      value: `$${averageIncome}`,
      change: "-7.0%", // placeholder
      positive: false,
    },
  ];

  const filteredEmployees = employees.filter((emp) => {
    return (
      (!departmentFilter || emp.Department === departmentFilter) &&
      (!jobrolefilter || emp.JobRole === jobrolefilter) &&
      (!attritionFilter || emp.attrition === attritionFilter)
    );
  });
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const displayedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployees(); // Replace with your API URL
        setEmployees(res);
        // console.log(res);
      } catch (err) {
        console.error("Failed to fetch employee data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleExport = async () => {
    try {
      await exportToExcel(); // Simply call the function
    } catch (e) {
    } finally {
    }
  };

  if (loading) return <p className="p-4">Loading employee data...</p>;

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
      <div className=" mt-2.5 flex justify-end gap-2">
        <Button
          variant="outline"
          className="border-gray-300"
          onClick={() => navigate("/add-employee")}
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Employee
        </Button>
        <Button
          variant="outline"
          className="border-gray-300"
          onClick={() => navigate("/add-employee")}
        >
          Edit Employee
        </Button>
        <Button
          variant="outline"
          className="border-gray-300"
          onClick={handleExport}
        >
          Export to Excel
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border px-2 py-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Departments</option>
          <option value="Sales">Sales</option>
          <option value="Research & Development">Research & Development</option>
          <option value="Human Resources">Human Resources</option>
          {[...new Set(employees.map((e) => e.Department))].map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={jobrolefilter}
          onChange={(e) => setJobroleFilter(e.target.value)}
          className="border px-2 py-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Job Roles</option>
          <option value="Sales Executive">Sales Executive</option>
          <option value="Research Scientist">Research Scientist</option>
          <option value="Laboratory Technician">Laboratory Technician</option>
          <option value="Manufacturing Director">Manufacturing Director</option>
          <option value="Healthcare Representative">
            Healthcare Representative
          </option>
          <option value="Manager">Manager</option>
          <option value="Sales Representative">Sales Representative</option>
          <option value="Research Director">Research Director</option>
          <option value="Human Resources">Human Resources</option>
        </select>

        <select
          value={attritionFilter}
          onChange={(e) => setAttritionFilter(e.target.value)}
          className="border px-2 py-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Attrition</option>
          <option value="Low Risk">Yes</option>
          <option value="Medium Risk">No</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl mt-2  border-none shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        <Table>
          <TableHeader>
            <TableRow className="border-r border-gray-400">
              <TableHead className="border-r border-gray-400">
                Employee ID
              </TableHead>
              <TableHead className="border-r border-gray-400">Name</TableHead>
              <TableHead className="border-r border-gray-400 hidden sm:table-cell">
                Department
              </TableHead>
              <TableHead className="border-r border-gray-400 hidden md:table-cell">
                Job Role
              </TableHead>
              <TableHead className="border-r border-gray-400">
                Attrition Status
              </TableHead>
              <TableHead className="border-r border-gray-400 hidden md:table-cell">
                Environment Satisfaction
              </TableHead>
              <TableHead className="border-r border-gray-400 hidden md:table-cell">
                Overtime
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedEmployees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell className="border-r border-gray-400">
                  {emp._id}
                </TableCell>
                <TableCell className="border-r border-gray-400">
                  {emp.name}
                </TableCell>
                <TableCell className="border-r border-gray-400 hidden sm:table-cell">
                  {emp.Department}
                </TableCell>
                <TableCell className="border-r border-gray-400 hidden sm:table-cell">
                  {emp.JobRole}
                </TableCell>
                <TableCell className="border-r border-gray-400">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                      emp.attritionRiskLevel
                    )}`}
                  >
                    {emp.attritionProbability}
                  </span>
                </TableCell>
                <TableCell className="border-r border-gray-400 hidden md:table-cell">
                  {emp.EnvironmentSatisfaction}/5
                </TableCell>
                <TableCell className="border-r border-gray-400 hidden md:table-cell">
                  {emp.OverTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-2">
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

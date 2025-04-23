import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

type Employee = {
  id: string;
  name: string;
  department: string;
  employmentType: "Full Time" | "Part Time" | "Contract";
  attritionStatus: "Low Risk" | "Medium Risk" | "High Risk";
  environmentSatisfaction: number;
  overtimeHours: number;
};

// 🔄 Expanded Dummy Data (add more as needed)
const allEmployees: Employee[] = Array.from({ length: 35 }).map((_, i) => ({
  id: `EMP${String(i + 1).padStart(3, "0")}`,
  name: `Employee ${i + 1}`,
  department: [
    "Engineering",
    "HR",
    "Marketing",
    "Sales",
    "IT",
    "Finance",
    "Operations",
  ][i % 7],
  employmentType: ["Full Time", "Part Time", "Contract"][
    i % 3
  ] as Employee["employmentType"],
  attritionStatus: ["Low Risk", "Medium Risk", "High Risk"][
    i % 3
  ] as Employee["attritionStatus"],
  environmentSatisfaction: (i % 5) + 1,
  overtimeHours: (i * 2) % 12,
}));

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

export function EmployeeTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Filters
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("");
  const [attritionFilter, setAttritionFilter] = useState("");

  const filteredEmployees = allEmployees.filter((emp) => {
    return (
      (!departmentFilter || emp.department === departmentFilter) &&
      (!employmentTypeFilter || emp.employmentType === employmentTypeFilter) &&
      (!attritionFilter || emp.attritionStatus === attritionFilter)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const displayedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="mt-4 space-y-4">
      {/* Top Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate("/add-employee")}>
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Employee
        </Button>
        <Button variant="outline" onClick={() => navigate("/edit-employee")}>
          Edit Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="">All Departments</option>
          {[...new Set(allEmployees.map((e) => e.department))].map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={employmentTypeFilter}
          onChange={(e) => setEmploymentTypeFilter(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="">All Employment Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <select
          value={attritionFilter}
          onChange={(e) => setAttritionFilter(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="">All Attrition</option>
          <option value="Low Risk">Low Risk</option>
          <option value="Medium Risk">Medium Risk</option>
          <option value="High Risk">High Risk</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-gray-800">
                Employee ID
              </TableHead>
              <TableHead className="border-r border-gray-800">Name</TableHead>
              <TableHead className="border-r border-gray-800">
                Department
              </TableHead>
              <TableHead className="border-r border-gray-800">
                Employment Type
              </TableHead>
              <TableHead className="border-r border-gray-800">
                Attrition Status
              </TableHead>
              <TableHead className="border-r border-gray-800">
                Environment Satisfaction
              </TableHead>
              <TableHead className="border-r border-gray-800">
                Overtime (hrs)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="border-r border-gray-800">
                  {emp.id}
                </TableCell>
                <TableCell className="border-r border-gray-800">
                  {emp.name}
                </TableCell>
                <TableCell className="border-r border-gray-800">
                  {emp.department}
                </TableCell>
                <TableCell className="border-r border-gray-800">
                  {emp.employmentType}
                </TableCell>
                <TableCell className="border-r border-gray-800">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                      emp.attritionStatus
                    )}`}
                  >
                    {emp.attritionStatus}
                  </span>
                </TableCell>
                <TableCell className="border-r border-gray-800">
                  {emp.environmentSatisfaction}/5
                </TableCell>
                <TableCell className="border-r border-gray-800">
                  {emp.overtimeHours} hrs
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center pt-2">
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

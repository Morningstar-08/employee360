import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee, getAllEmployees } from "@/services/apiEmployee";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
        console.log(res);
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
          <option value="">Sales</option>
          <option value="">Research & Development</option>
          <option value="">Human Resources</option>
          {[...new Set(employees.map((e) => e.Department))].map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={jobrolefilter}
          onChange={(e) => setJobroleFilter(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="">All Job Roles</option>
          <option value="Full Time">Sales Executive</option>
          <option value="Part Time">Research Scientist</option>
          <option value="Contract">Laboratory Technician</option>
          <option value="Contract">Manufacturing Director</option>
          <option value="Contract">Healthcare Representative</option>
          <option value="Contract">Manager</option>
          <option value="Contract">Sales Representative</option>
          <option value="Contract">Research Director</option>
          <option value="Contract">Human Resources</option>
        </select>

        <select
          value={attritionFilter}
          onChange={(e) => setAttritionFilter(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="">All Attrition</option>
          <option value="Low Risk">Yes</option>
          <option value="Medium Risk">No</option>
        </select>
      </div>
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
          {displayedEmployees.map((emp) => (
            <TableRow key={emp._id}>
              <TableCell>{emp._id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.Department}</TableCell>
              <TableCell>{emp.Department}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                    emp.attritionRiskLevel
                  )}`}
                >
                  {emp.attritionProbability}
                </span>
              </TableCell>
              <TableCell>{emp.EnvironmentSatisfaction}/5</TableCell>
              <TableCell>{emp.OverTime} hrs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

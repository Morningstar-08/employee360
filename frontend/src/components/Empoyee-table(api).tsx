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

export default function EmployeeTable() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

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
                            <TableCell>
                                {emp.EnvironmentSatisfaction}/5
                            </TableCell>
                            <TableCell>{emp.OverTime} hrs</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

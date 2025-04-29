import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import {
  addEmployee,
  editEmployee,
  Employee,
  getAllEmployees,
  removeEmployee,
} from "@/services/apiEmployee";

const defaultEmployee: Employee = {
  name: "",
  email: "",
  phone: "",
  address: "",
  Age: "",
  Department: "",
  Gender: "",
  MaritalStatus: "",
  Education: "",
  JobInvolvement: "",
  JobLevel: "",
  JobRole: "",
  JobSatisfaction: "",
  OverTime: "",
  YearsAtCompany: "",
  YearsSinceLastPromotion: "",
  MonthlyIncome: "",
  PercentSalaryHike: "",
  PerformanceRating: "",
  WorkLifeBalance: "",
  EnvironmentSatisfaction: "",
  attrition: "No",
  leavingMonth: "",
};

export default function EmployeeForm() {
  const [tab, setTab] = useState("general");
  const [employee, setEmployee] = useState<Employee>({ ...defaultEmployee });
  const [mode, setMode] = useState<"add" | "edit" | "remove">("add");
  const [searchId, setSearchId] = useState("");

  const fixNumericFields = (emp: any) => {
    const numericFields = [
      "Age",
      "Education",
      "EnvironmentSatisfaction",
      "JobInvolvement",
      "JobLevel",
      "JobSatisfaction",
      "MonthlyIncome",
      "PercentSalaryHike",
      "PerformanceRating",
      "WorkLifeBalance",
      "YearsAtCompany",
      "YearsSinceLastPromotion",
    ];

    const fixedEmployee = { ...emp };
    numericFields.forEach((key) => {
      if (fixedEmployee[key] !== undefined) {
        fixedEmployee[key] = Number(fixedEmployee[key]);
      }
    });

    return fixedEmployee;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: keyof Employee) => (value: string) => {
    setEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const requiredFields = [
      "name",
      "Gender",
      "email",
      "address",
      "Age",
      "MaritalStatus",
      "Education",
      "JobInvolvement",
      "JobLevel",
      "JobRole",
      "JobSatisfaction",
      "OverTime",
      "YearsAtCompany",
      "YearsSinceLastPromotion",
      "MonthlyIncome",
      "PercentSalaryHike",
      "PerformanceRating",
      "WorkLifeBalance",
      "EnvironmentSatisfaction",
    ];

    const allFieldsFilled = requiredFields.every((field) => {
      const key = field as keyof Employee;
      return (
        employee[key] !== "" &&
        employee[key] !== null &&
        employee[key] !== undefined
      );
    });

    if (!allFieldsFilled) {
      alert("Please fill in all fields before saving.");
      return;
    }

    try {
      if (mode === "edit") {
        const fixedEmployee = fixNumericFields(employee);
        await editEmployee(fixedEmployee._id!, fixedEmployee);
        alert("Employee updated successfully!");
      } else {
        const fixedEmployee = fixNumericFields(employee);
        console.log("Adding employee:", fixedEmployee);
        await addEmployee(fixedEmployee);
        alert("Employee added successfully!");
      }
      setEmployee({ ...defaultEmployee });
      setMode("add");
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee.");
    }
  };

  const handleClear = () => {
    setEmployee({ ...defaultEmployee });
    setMode("add");
  };

  const handleEditSearch = async () => {
    try {
      const allEmployees = await getAllEmployees();
      const match = allEmployees.find((emp) => emp._id === searchId);
      if (match) {
        setEmployee({ ...match });
        setMode("edit");
      } else {
        alert("Employee not found.");
      }
    } catch (error) {
      console.error("Error searching employee:", error);
      alert("Failed to fetch employees.");
    }
  };

  const handleRemove = async () => {
    try {
      const allEmployees = await getAllEmployees();
      const match = allEmployees.find((emp) => emp._id === searchId);

      const leavingMonth = window.prompt(
        "Enter the employee's leaving month (e.g., 'March')"
      );

      if (!leavingMonth || leavingMonth.trim() === "") {
        alert("Leaving month is required to remove the employee.");
        return;
      }

      if (match) {
        await removeEmployee(match._id!, leavingMonth);
        alert("Employee removed successfully.");
      } else {
        alert("Employee not found.");
      }

      setSearchId("");
      setEmployee({ ...defaultEmployee });
      setMode("add");
    } catch (error) {
      console.error("Error removing employee:", error);
      alert("Failed to remove employee.");
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";
  const renderTabContent = () => {
    const InputField = (name: keyof Employee, placeholder: string) => (
      <Input
        name={name}
        value={employee[name]}
        placeholder={placeholder}
        onChange={handleChange}
        className={inputClass}
      />
    );

    switch (tab) {
      case "general":
        return (
          <>
            {InputField("name", "Full Name")}
            {InputField("Age", "Enter your Age")}
            <div className="flex space-x-4">
              <Select
                value={employee.Gender}
                onValueChange={handleSelectChange("Gender")}
              >
                <SelectTrigger className="w-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {InputField("phone", "Enter your Phone Number")}
            </div>

            {InputField("email", "Email")}
            {InputField("address", "Enter your Address")}
            <Select
              value={employee.MaritalStatus}
              onValueChange={handleSelectChange("MaritalStatus")}
            >
              <SelectTrigger className="w-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="Marital Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={String(employee.Education)}
              onValueChange={handleSelectChange("Education")}
            >
              <SelectTrigger className="w-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="Education" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1">Below College</SelectItem>
                <SelectItem value="2">College</SelectItem>
                <SelectItem value="3">Bachelor</SelectItem>
                <SelectItem value="4">Master</SelectItem>
                <SelectItem value="5">Doctor</SelectItem>
              </SelectContent>
            </Select>
          </>
        );
      case "job":
        return (
          <>
            {InputField(
              "JobInvolvement",
              "Job Involvement - 1(lower)-4(Higher)"
            )}
            {InputField("JobLevel", "Job Level")}
            <div className="flex space-x-4">
              <Select
                value={employee.Department}
                onValueChange={handleSelectChange("Department")}
              >
                <SelectTrigger className="w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Research & Development">
                    Research & Development
                  </SelectItem>
                  <SelectItem value="Human Resources">
                    Human Resources
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={employee.JobRole}
                onValueChange={handleSelectChange("JobRole")}
              >
                <SelectTrigger className="w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <SelectValue placeholder="Job Role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Sales Executive">
                    Sales Executive
                  </SelectItem>
                  <SelectItem value="Research Scientist">
                    Research Scientist
                  </SelectItem>
                  <SelectItem value="Laboratory Technician">
                    Laboratory Technician
                  </SelectItem>
                  <SelectItem value="Manufacturing Director">
                    Manufacturing Director
                  </SelectItem>
                  <SelectItem value="Healthcare Representative">
                    Healthcare Representative
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {InputField(
              "JobSatisfaction",
              "Job Satisfaction - 1(lower)-4(Higher)"
            )}
            <Select
              value={employee.OverTime}
              onValueChange={handleSelectChange("OverTime")}
            >
              <SelectTrigger className="w-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="OverTime" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {InputField("YearsAtCompany", "Years at Company")}
            {InputField(
              "YearsSinceLastPromotion",
              "Years Since Last Promotion"
            )}
          </>
        );
      case "payroll":
        return (
          <>
            {InputField("MonthlyIncome", "Monthly Income")}
            {InputField("PercentSalaryHike", "Percent Salary Hike")}
            {InputField(
              "PerformanceRating",
              "Performance Rating - 1(Lower)-4(Higher)"
            )}
            {InputField(
              "WorkLifeBalance",
              "Work-Life Balance - 1(Lower)-4(Higher)"
            )}
          </>
        );
      case "others":
        return (
          <>
            {InputField(
              "EnvironmentSatisfaction",
              "Environment Satisfaction - 1(Lower)-4(Higher)"
            )}
            {InputField(
              "WorkLifeBalance",
              "Work-Life Balance - 1(Lower)-4(Higher)"
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow">
      <nav className="flex gap-6 text-blue-500 font-medium border-b pb-2 mb-4">
        {["general", "job", "payroll", "others"].map((item) => (
          <span
            key={item}
            className={`cursor-pointer ${
              tab === item ? "border-b-2 border-blue-600 pb-1" : "text-gray-800"
            }`}
            onClick={() => setTab(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </span>
        ))}
      </nav>

      {(mode === "edit" || mode === "remove") && tab === "general" && (
        <div className="flex flex-col gap-3 mb-4">
          <Input
            placeholder="Search by Employee ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          {mode === "edit" ? (
            <Button onClick={handleEditSearch}>Search & Edit</Button>
          ) : (
            <Button onClick={handleRemove}>Remove</Button>
          )}
        </div>
      )}

      <div className="space-y-4">{renderTabContent()}</div>

      <div className="mt-6 flex gap-4 mb-4">
        <Button
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-500"
          variant="outline"
          onClick={handleSave}
        >
          {mode === "edit" ? "Update" : "Save"}
        </Button>

        <Button
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-500"
          variant="outline"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-500"
          variant="outline"
          onClick={() => setMode("edit")}
        >
          Edit Existing
        </Button>
        <Button
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-500"
          variant="outline"
          onClick={() => setMode("remove")}
        >
          Remove Employee
        </Button>
      </div>
    </div>
  );
}

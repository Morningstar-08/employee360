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

// Define the employee type
type Employee = {
  id?: string;
  name: string;
  email: string;
  age: string | number;
  department: string;
  satisfaction: string | number;
  gender: string;
  maritalStatus: string;
  dob: string;
  education: string | number;
  jobInvolvement: string | number;
  jobLevel: string | number;
  jobRole: string;
  jobSatisfaction: string | number;
  overTime: string;
  yearsAtCompany: string | number;
  yearsSinceLastPromotion: string | number;
  monthlyIncome: string | number;
  percentSalaryHike: string | number;
  performanceRating: string | number;
  workLifeBalance: string | number;
  environmentSatisfaction: string | number;
};

const defaultEmployee: Employee = {
  id: "",
  name: "",
  email: "",
  age: "",
  department: "",
  satisfaction: "",
  gender: "",
  maritalStatus: "",
  dob: "",
  education: "",
  jobInvolvement: "",
  jobLevel: "",
  jobRole: "",
  jobSatisfaction: "",
  overTime: "",
  yearsAtCompany: "",
  yearsSinceLastPromotion: "",
  monthlyIncome: "",
  percentSalaryHike: "",
  performanceRating: "",
  workLifeBalance: "",
  environmentSatisfaction: "",
};

export default function EmployeeForm() {
  const [tab, setTab] = useState("general");
  const [employee, setEmployee] = useState<Employee>({ ...defaultEmployee });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [mode, setMode] = useState<"add" | "edit" | "remove">("add");
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");

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
  // const isFormComplete = () => {
  //   return Object.entries(employee).every(([key, value]) => {
  //     if (key === "id") return true; // ID is auto-generated or used for edit
  //     return value !== "" && value !== null && value !== undefined;
  //   });
  // };

  const handleSave = () => {
    const requiredFields = [
      "name",
      "gender",
      "email",
      "dob",
      "maritalStatus",
      "education",
      "jobInvolvement",
      "jobLevel",
      "jobRole",
      "jobSatisfaction",
      "overTime",
      "yearsAtCompany",
      "yearsSinceLastPromotion",
      "monthlyIncome",
      "percentSalaryHike",
      "performanceRating",
      "workLifeBalance",
      "environmentSatisfaction",
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

    if (mode === "edit") {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employee.id ? employee : emp))
      );
      alert("Employee updated successfully!");
    } else {
      setEmployees((prev) => [
        ...prev,
        { ...employee, id: crypto.randomUUID() },
      ]);
      alert("Employee added successfully!");
    }

    setEmployee({ ...defaultEmployee });
    setMode("add");
  };

  const handleClear = () => {
    setEmployee({ ...defaultEmployee });
    setMode("add");
  };

  const handleEditSearch = () => {
    const match = employees.find(
      (emp) =>
        emp.name.toLowerCase() === searchName.toLowerCase() ||
        emp.id === searchId
    );
    if (match) {
      setEmployee({ ...match });
      setMode("edit");
    } else {
      alert("Employee not found.");
    }
  };

  const handleRemove = () => {
    const match = employees.find(
      (emp) =>
        emp.name.toLowerCase() === searchName.toLowerCase() ||
        emp.id === searchId
    );
    if (match) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== match.id));
      alert("Employee removed.");
    } else {
      alert("Employee not found.");
    }
    setSearchName("");
    setSearchId("");
    setEmployee({ ...defaultEmployee });
    setMode("add");
  };

  const inputClass =
    "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

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
            <Select
              value={employee.gender}
              onValueChange={handleSelectChange("gender")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {InputField("email", "Email")}
            {InputField("dob", "DOB (YYYY-MM-DD)")}
            <Select
              value={employee.maritalStatus}
              onValueChange={handleSelectChange("maritalStatus")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Marital Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={String(employee.education)}
              onValueChange={handleSelectChange("education")}
            >
              <SelectTrigger>
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
              "jobInvolvement",
              "Job Involvement - 1(lower)-4(Higher)"
            )}
            {InputField("jobLevel", "Job Level")}
            <Select
              value={employee.jobRole}
              onValueChange={handleSelectChange("jobRole")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Job Role" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1">Sales Executive</SelectItem>
                <SelectItem value="2">Research Scientist</SelectItem>
                <SelectItem value="3">Laboratory Technician</SelectItem>
                <SelectItem value="4">Manufacturing Director</SelectItem>
              </SelectContent>
            </Select>
            {InputField(
              "jobSatisfaction",
              "Job Satisfaction - 1(lower)-4(Higher)"
            )}
            <Select
              value={employee.overTime}
              onValueChange={handleSelectChange("overTime")}
            >
              <SelectTrigger>
                <SelectValue placeholder="OverTime" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {InputField("yearsAtCompany", "Years at Company")}
            {InputField(
              "yearsSinceLastPromotion",
              "Years Since Last Promotion"
            )}
          </>
        );
      case "payroll":
        return (
          <>
            {InputField("monthlyIncome", "Monthly Income")}
            {InputField("percentSalaryHike", "Percent Salary Hike")}
            {InputField(
              "performanceRating",
              "Performance Rating - 1(Lower)-4(Higher)"
            )}
            {InputField(
              "workLifeBalance",
              "Work-Life Balance - 1(Lower)-4(Higher)"
            )}
          </>
        );
      case "others":
        return (
          <>
            {InputField(
              "environmentSatisfaction",
              "Environment Satisfaction - 1(Lower)-4(Higher)"
            )}
            {InputField(
              "workLifeBalance",
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
      <nav className="flex gap-6 text-blue-600 font-medium border-b pb-2 mb-4">
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
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Input
            placeholder="Search by ID"
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
        <Button variant="outline" onClick={handleSave}>
          {mode === "edit" ? "Update" : "Save"}
        </Button>

        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
      <div className="flex gap-2 mb-4">
        <Button variant="outline" onClick={() => setMode("edit")}>
          Edit Existing
        </Button>
        <Button variant="outline" onClick={() => setMode("remove")}>
          Remove Employee
        </Button>
      </div>
    </div>
  );
}

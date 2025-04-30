"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const dummyPredictionData = [
  { name: "Likely", value: 65 },
  { name: "Unlikely", value: 35 },
];

const initialFormState = {
  Age: "",
  JobLevel: "",
  MonthlyIncome: "",
  PercentSalaryHike: "",
  YearsAtCompany: "",
  YearsSinceLastPromotion: "",
  Department: "",
  Education: "",
  EnvironmentSatisfaction: "",
  Gender: "",
  JobInvolvement: "",
  JobRole: "",
  JobSatisfaction: "",
  MaritalStatus: "",
  OverTime: "",
  PerformanceRating: "",
  WorkLifeBalance: "",
};

export default function RetentionPredictionForm() {
  const [showGraph, setShowGraph] = useState(false);
  type FormField = keyof typeof initialFormState;
  type FormData = Record<FormField, string>;

  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setShowGraph(true);
  };

  return (
    <div className="flex flex-col items-center justify-top min-h-screen  px-2 py-5 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-10 text-center">
        Employee Retention Prediction
      </h1>

      <div
        className={`w-full max-w-7xl grid grid-cols-1 gap-6 ${
          showGraph ? "lg:grid-cols-2" : ""
        }`}
      >
        {/* Form Card */}
        <Card className="shadow-[0_0_10px_rgba(0,0,0,0.25)]  border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-blue-600 text-center">
              Enter Employee Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Input Fields */}
              {[
                {
                  label: "Age",
                  name: "age",
                  type: "number",
                  props: { min: 18, max: 65 },
                },
                {
                  label: "Job Level",
                  name: "jobLevel",
                  type: "number",
                  props: { min: 1 },
                },
                {
                  label: "Monthly Income",
                  name: "monthlyIncome",
                  type: "number",
                  props: { min: 1000, max: 200000 },
                },
                {
                  label: "Percent Salary Hike",
                  name: "percentSalaryHike",
                  type: "number",
                  props: { min: 10, max: 25, step: 0.1 },
                },
                {
                  label: "Years at Company",
                  name: "yearsAtCompany",
                  type: "number",
                  props: { min: 0, max: 40 },
                },
                {
                  label: "Years Since Last Promotion",
                  name: "yearsSinceLastPromotion",
                  type: "number",
                  props: { min: 0, max: 15 },
                },
              ].map((field) => (
                <div key={field.name}>
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                  </Label>
                  <Input
                    name={field.name}
                    type={field.type}
                    {...field.props}
                    value={formData[field.name as FormField]}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}

              {/* Select Fields */}
              {[
                {
                  name: "department",
                  label: "Department",
                  options: [
                    "Sales",
                    "Research & Development",
                    "Human Resources",
                  ],
                },
                {
                  name: "education",
                  label: "Education",
                  options: [
                    "Below College",
                    "College",
                    "Bachelor",
                    "Master",
                    "Doctor",
                  ],
                },
                {
                  name: "environmentSatisfaction",
                  label: "Environment Satisfaction",
                  options: ["Low", "Medium", "High", "Very High"],
                },
                {
                  name: "gender",
                  label: "Gender",
                  options: ["Male", "Female"],
                },
                {
                  name: "jobInvolvement",
                  label: "Job Involvement",
                  options: ["Low", "Medium", "High", "Very High"],
                },
                {
                  name: "jobRole",
                  label: "Job Role",
                  options: [
                    "Sales Executive",
                    "Research Scientist",
                    "Laboratory Technician",
                    "Manufacturing Director",
                    "Healthcare Representative",
                    "Manager",
                    "Sales Representative",
                    "Human Resources",
                    "Research Director",
                  ],
                },
                {
                  name: "jobSatisfaction",
                  label: "Job Satisfaction",
                  options: ["Low", "Medium", "High", "Very High"],
                },
                {
                  name: "maritalStatus",
                  label: "Marital Status",
                  options: ["Single", "Married", "Divorced"],
                },
                { name: "overTime", label: "Overtime", options: ["Yes", "No"] },
                {
                  name: "performanceRating",
                  label: "Performance Rating",
                  options: ["Low", "Good", "Excellent", "Outstanding"],
                },
                {
                  name: "workLifeBalance",
                  label: "Work-Life Balance",
                  options: ["Bad", "Good", "Better", "Best"],
                },
              ].map((field) => (
                <div key={field.name}>
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                  </Label>
                  <select
                    name={field.name}
                    value={formData[field.name as FormField]}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="" disabled>
                      {`Select ${field.label}`}
                    </option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="sm:col-span-2 flex justify-end mt-4">
                {/* <Button
                  variant="outline"
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  Predict Retention
                </Button> */}
                <button
                  type="submit"
                  className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-500"
                >
                  Predict Retention
                </button>
                {/* <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Alternative
                </button> */}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Prediction Chart */}
        {showGraph && (
          <Card className="shadow-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-semibold text-blue-600 text-center">
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dummyPredictionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      {/* {Object.values(formData).some((val) => val !== "") && (
        <div className="mt-6 w-full max-w-4xl bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Form Data Preview:
          </h2>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  );
}

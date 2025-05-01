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
import { attritionPrediction } from "@/services/apiEmployee";

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

  const [predictionData, setPredictionData] = useState([
    { name: "Likely", value: 0 },
    { name: "Unlikely", value: 0 },
  ]);

  const [reasons, setReasons] = useState<string[]>([]);
  const [classification, setClassification] = useState<string>("");

  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await attritionPrediction(formData);

      const { probability, classification, reasons } = response;

      // Update the prediction data based on the response
      setPredictionData([
        { name: "Likely", value: Math.round(probability * 100) },
        { name: "Unlikely", value: Math.round((1 - probability) * 100) },
      ]);
      setClassification(classification);
      // Update the reasons
      setReasons(reasons.slice(0, 3)); // Only show the top 3 reasons

      // Show the graph after setting the data
      setShowGraph(true);
    } catch (error) {
      console.error("Error:", error);
    }
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
                  name: "Age",
                  type: "number",
                  props: { min: 18, max: 65 },
                },
                {
                  label: "Job Level",
                  name: "JobLevel",
                  type: "number",
                  props: { min: 1 },
                },
                {
                  label: "Monthly Income",
                  name: "MonthlyIncome",
                  type: "number",
                  props: { min: 1000, max: 200000 },
                },
                {
                  label: "Percent Salary Hike",
                  name: "PercentSalaryHike",
                  type: "number",
                  props: { min: 10, max: 25, step: 0.1 },
                },
                {
                  label: "Years at Company",
                  name: "YearsAtCompany",
                  type: "number",
                  props: { min: 0, max: 40 },
                },
                {
                  label: "Years Since Last Promotion",
                  name: "YearsSinceLastPromotion",
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
                  name: "Department",
                  label: "Department",
                  options: [
                    "Sales",
                    "Research & Development",
                    "Human Resources",
                  ],
                },
                {
                  name: "Education",
                  label: "Education",
                  options: [1, 2, 3, 4],
                },
                {
                  name: "EnvironmentSatisfaction",
                  label: "Environment Satisfaction",
                  options: [1, 2, 3, 4],
                },
                {
                  name: "Gender",
                  label: "Gender",
                  options: ["Male", "Female"],
                },
                {
                  name: "JobInvolvement",
                  label: "Job Involvement",
                  options: [1, 2, 3, 4],
                },
                {
                  name: "JobRole",
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
                  name: "JobSatisfaction",
                  label: "Job Satisfaction",
                  options: [1, 2, 3, 4],
                },
                {
                  name: "MaritalStatus",
                  label: "Marital Status",
                  options: ["Single", "Married", "Divorced"],
                },
                { name: "OverTime", label: "Overtime", options: ["Yes", "No"] },
                {
                  name: "PerformanceRating",
                  label: "Performance Rating",
                  options: [1, 2, 3, 4],
                },
                {
                  name: "WorkLifeBalance",
                  label: "Work-Life Balance",
                  options: [1, 2, 3, 4],
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
                <button
                  type="submit"
                  className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-500"
                >
                  Predict Retention
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Prediction Chart */}
        {showGraph && (
          <Card className="shadow-[0_0_10px_rgba(0,0,0,0.25)]  border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-semibold text-blue-600 text-center">
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={predictionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              {reasons.length > 0 && (
                <div className="mt-6">
                  {/* New sentence showing classification */}
                  <h3 className="text-sm text-gray-700 mb-2">
                    This employee is at <strong>{classification}</strong> risk
                    of leaving the company.
                  </h3>
                  <h3 className="text-md font-semibold mb-2 text-gray-700">
                    Top 3 Reasons for Predicted Attrition:
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

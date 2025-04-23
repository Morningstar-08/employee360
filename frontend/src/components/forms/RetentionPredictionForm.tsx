import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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

export default function RetentionPredictionForm() {
  const [showGraph, setShowGraph] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGraph(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Employee Retention Prediction
      </h1>

      <div
        className={`w-full max-w-7xl transition-all duration-500 ${
          showGraph ? "flex flex-col md:flex-row gap-6" : ""
        }`}
      >
        {/* Form Card */}
        <Card
          className={`w-full md:w-1/2 ${
            showGraph ? "" : "mx-auto"
          } shadow-lg border border-gray-300`}
        >
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
            >
              {/* Form fields - keeping them as-is for now */}
              <div>
                <Label htmlFor="age">Age</Label>
                <Input type="number" min={18} max={65} name="age" required />
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select name="department" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
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
              </div>

              {/* Remaining fields (unchanged logic, but follow the same structure) */}
              <div>
                <Label htmlFor="education">Education</Label>
                <Select name="education" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">Below College</SelectItem>
                    <SelectItem value="2">College</SelectItem>
                    <SelectItem value="3">Bachelor</SelectItem>
                    <SelectItem value="4">Master</SelectItem>
                    <SelectItem value="5">Doctor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="environmentSatisfaction">
                  Environment Satisfaction
                </Label>
                <Select name="environmentSatisfaction" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select satisfaction level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">Low</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="3">High</SelectItem>
                    <SelectItem value="4">Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="jobInvolvement">Job Involvement</Label>
                <Select name="jobInvolvement" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select involvement level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">Low</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="3">High</SelectItem>
                    <SelectItem value="4">Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="jobLevel">Job Level</Label>
                <Input type="number" name="jobLevel" min={1} required />
              </div>

              <div>
                <Label htmlFor="jobRole">Job Role</Label>
                <Select name="jobRole" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
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
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Sales Representative">
                      Sales Representative
                    </SelectItem>
                    <SelectItem value="Human Resources">
                      Human Resources
                    </SelectItem>
                    <SelectItem value="Research Director">
                      Research Director
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="jobSatisfaction">Job Satisfaction</Label>
                <Select name="jobSatisfaction" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select satisfaction level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">Low</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="3">High</SelectItem>
                    <SelectItem value="4">Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select name="maritalStatus" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Input
                  type="number"
                  name="monthlyIncome"
                  min={1000}
                  max={20000}
                  required
                />
              </div>

              <div>
                <Label htmlFor="overTime">Overtime</Label>
                <Select name="overTime" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="percentSalaryHike">Percent Salary Hike</Label>
                <Input
                  type="number"
                  name="percentSalaryHike"
                  step="0.1"
                  min={10}
                  max={25}
                  required
                />
              </div>

              <div>
                <Label htmlFor="performanceRating">Performance Rating</Label>
                <Select name="performanceRating" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">Low</SelectItem>
                    <SelectItem value="2">Good</SelectItem>
                    <SelectItem value="3">Excellent</SelectItem>
                    <SelectItem value="4">Outstanding</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="workLifeBalance">Work-Life Balance</Label>
                <Select name="workLifeBalance" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select balance level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">Bad</SelectItem>
                    <SelectItem value="2">Good</SelectItem>
                    <SelectItem value="3">Better</SelectItem>
                    <SelectItem value="4">Best</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="yearsAtCompany">Years at Company</Label>
                <Input
                  type="number"
                  name="yearsAtCompany"
                  min={0}
                  max={40}
                  required
                />
              </div>

              <div>
                <Label htmlFor="yearsSinceLastPromotion">
                  Years Since Last Promotion
                </Label>
                <Input
                  type="number"
                  name="yearsSinceLastPromotion"
                  min={0}
                  max={15}
                  required
                />
              </div>

              <div className="md:col-span-2 mt-4 flex justify-end">
                <Button type="submit" variant="default">
                  Predict Retention
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Prediction Result Chart */}
        {showGraph && (
          <Card className="w-full md:w-1/2 shadow-lg border border-gray-300">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600 text-center">
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
    </div>
  );
}

"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import SideHeader from "@/components/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AddEmployeeForm from "@/components/forms/EmployeeFormTabs";
import { EmployeeProfileCard } from "@/components/forms/EmployeeProfile";

export default function AddEmployee() {
  const [employee] = useState({
    id: "emp001",
    name: "Pristia Candra",
    email: "newmail@gmail.com",
    age: 28,
    department: "Design",
    satisfaction: 4,
    gender: "female",
    maritalStatus: "single",
    dob: "1997-05-12",
    education: 3,
    role: "Designer",
    jobInvolvement: 3,
    jobLevel: 2,
    jobRole: "3D Designer",
    jobSatisfaction: 4,
    overTime: "No",
    yearsAtCompany: 3,
    yearsSinceLastPromotion: 1,
    monthlyIncome: 55000,
    percentSalaryHike: 15,
    performanceRating: 3,
    workLifeBalance: 3,
    environmentSatisfaction: 4,
  });

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <SideHeader />
        <div className="flex flex-col flex-1 px-4 py-6 md:px-6">
          <h1 className="text-2xl font-semibold mb-4">Add New Employee</h1>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <EmployeeProfileCard employee={employee} />
            </div>
            <div className="w-full md:w-2/3">
              <AddEmployeeForm />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

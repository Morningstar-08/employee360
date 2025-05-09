import Sidebar from "@/components/sidebar";
import SideHeader from "@/components/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { EmployeeTable } from "@/components/Employee-Table";
import EmployeeTableApi from "@/components/Empoyee-table(api)";

export default function EmployeeList() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <SideHeader />
        <div className="flex flex-col flex-1 px-4 py-6 md:px-6">
          <h1 className="text-2xl font-semibold mb-4">Employee Directory</h1>
          <EmployeeTableApi />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// import { AppSidebar } from "@/components/app-sidebar";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { SectionCards } from "@/components/section-cards";
// import { SiteHeader } from "@/components/site-header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { Component } from "@/components/pichart-doughnut";
// export default function Dashboard() {
//   return (
//     <SidebarProvider>
//       <AppSidebar variant="inset" />
//       <SidebarInset>
//         <SiteHeader />
//         <div className="flex flex-col flex-1 px-4 py-6 md:px-6">
//           <SectionCards />
//           <br />
//           <ChartAreaInteractive />
//           <br />
//           <Component />
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
import Sidebar from "@/components/sidebar";
import SideHeader from "@/components/side-header";
import DashboardUI from "@/components/dashboardui";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SideHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardUI />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

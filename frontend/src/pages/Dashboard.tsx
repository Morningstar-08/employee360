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

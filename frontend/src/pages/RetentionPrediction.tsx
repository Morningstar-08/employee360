import Sidebar from "@/components/sidebar";
import SideHeader from "@/components/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import RetentionPredictionForm from "@/components/forms/RetentionPredictionForm";

export default function RetentionPrediction() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <SideHeader />
        <div className="flex flex-col flex-1 px-4 py-6 md:px-6">
          <h1 className="text-2xl font-semibold mb-4">Retention Prediction</h1>
          <RetentionPredictionForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/sidebar";
import SideHeader from "@/components/topbar";

export default function Chatpage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SideHeader />
        <div className="flex flex-col flex-1 px-4 py-6 md:px-6 overflow-y-auto">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}

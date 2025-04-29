import { UserContext } from "@/contexts/userContext";
import { Bell, Menu, X } from "lucide-react";
import { useContext, useState } from "react";

const SideHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(UserContext)!;

  // Dispatch event so Sidebar can listen
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    window.dispatchEvent(
      new CustomEvent("toggle-sidebar", { detail: !sidebarOpen })
    );
  };

  return (
    <header className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      {/* Hamburger Toggle */}
      <div className="md:hidden fixed top-3 left-4 z-50">
        <button onClick={toggleSidebar} className="p-3 rounded-md ">
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="relative w-1/2">
        <p className="ml-10 text-lg font-semibold">
          Welcome Back, {user?.name} 🌟
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="w-5 h-5 text-gray-500" />
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SideHeader;

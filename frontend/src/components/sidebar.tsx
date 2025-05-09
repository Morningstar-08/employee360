import {
  LayoutDashboard,
  Users,
  UserPlus,
  ListOrdered,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/userContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile

  useEffect(() => {
    if (
      currentPath.startsWith("/add-employee") ||
      currentPath.startsWith("/employee-list")
    ) {
      setEmployeeOpen(true);
    }
  }, [currentPath]);

  const { clearUser } = useContext(UserContext)!;

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };
  useEffect(() => {
    const handleToggleSidebar = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSidebarOpen(customEvent.detail);
    };

    window.addEventListener("toggle-sidebar", handleToggleSidebar);

    return () => {
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
    };
  }, []);
  const isActive = (path: string) => currentPath === path;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out w-64 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block`}
      >
        {/* Logo */}
        <div className="p-6 text-2xl font-bold text-primary flex items-center space-x-2">
          <img src="/vite.svg" alt="Logo" className="w-10 h-10 rounded-full" />
          <span>Employee 360</span>
        </div>

        {/* Top Section */}
        <div className="flex-1 overflow-y">
          <ul className="space-y-2">
            <li
              onClick={() => handleNavigate("/dashboard")}
              className={`px-6 py-2 flex items-center space-x-3 rounded-r-full transition-all duration-200 hover:scale-105 cursor-pointer ${
                isActive("/dashboard")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </li>

            {/* Employees Dropdown */}
            <ul>
              <div
                onClick={() => setEmployeeOpen(!employeeOpen)}
                className="px-6 py-2 flex items-center justify-between rounded-r-full transition-all duration-200 hover:scale-105 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span className="font-medium text-gray-700">Employees</span>
                </div>
                {employeeOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              <div
                className={`ml-10 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${
                  employeeOpen ? "max-h-40" : "max-h-0"
                }`}
              >
                <li
                  onClick={() => handleNavigate("/add-employee")}
                  className={`px-4 py-1 rounded-md transition-all duration-150 cursor-pointer ${
                    currentPath === "/add-employee"
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Add Employee</span>
                  </div>
                </li>
                <li
                  onClick={() => handleNavigate("/employee-list")}
                  className={`px-4 py-1 rounded-md transition-all duration-150 cursor-pointer ${
                    currentPath === "/employee-list"
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ListOrdered className="w-4 h-4" />
                    <span>Employee List</span>
                  </div>
                </li>
              </div>
            </ul>

            <li
              onClick={() => handleNavigate("/retention-prediction")}
              className={`px-6 py-2 flex items-center space-x-3 rounded-r-full transition-all duration-200 hover:scale-105 cursor-pointer ${
                isActive("/retention-prediction")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Retention Prediction</span>
            </li>
          </ul>
        </div>

        {/* Bottom Section - Sticky */}
        {/* Logout Section pinned to the bottom */}
        <div className="mt-auto border-t px-4 py-4">
          <ul className="space-y-2">
            <li
              onClick={handleLogout}
              className="px-4 py-2 flex items-center space-x-3 rounded-md transition-all duration-200 hover:scale-105 cursor-pointer hover:bg-gray-100 text-red-600 font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

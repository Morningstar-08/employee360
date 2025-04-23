import {
  LayoutDashboard,
  Users,
  UserPlus,
  ListOrdered,
  Settings,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [employeeOpen, setEmployeeOpen] = useState(false);

  useEffect(() => {
    if (
      currentPath.startsWith("/add-employee") ||
      currentPath.startsWith("/employee-list")
    ) {
      setEmployeeOpen(true);
    }
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-primary flex items-center space-x-2">
        <img
          src="/src/components/images/Emp360.png"
          alt="Logo"
          className="w-6 h-6 rounded-full"
        />
        <span>Circle Soft</span>
      </div>

      {/* Main Navigation */}
      <ul className="space-y-2 flex-1 overflow-y-auto">
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
        <li>
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
          {employeeOpen && (
            <ul className="ml-10 mt-2 space-y-1">
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
            </ul>
          )}
        </li>

        {/* Retention Prediction */}
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

        {/* Bottom Section - Stick to Bottom */}
        <li className="mt-auto">
          <ul className="space-y-2 pt-6 border-t">
            <li
              onClick={() => handleNavigate("/profile")}
              className={`px-6 py-2 flex items-center space-x-3 rounded-r-full transition-all duration-200 hover:scale-105 cursor-pointer ${
                isActive("/profile")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </li>
            <li
              onClick={() => handleNavigate("/setting")}
              className={`px-6 py-2 flex items-center space-x-3 rounded-r-full transition-all duration-200 hover:scale-105 cursor-pointer ${
                isActive("/setting")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Setting</span>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

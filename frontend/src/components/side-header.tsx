import { Bell } from "lucide-react";

const SideHeader = () => {
  return (
    <header className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <div className="relative w-1/2">
        <p className="text-lg font-semibold">Welcome Back, Gavano 🌟</p>
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
            <p className="text-sm font-semibold">Gavano</p>
            <p className="text-xs text-gray-500">HR Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SideHeader;

type Employee = {
  id?: string;
  name: string;
  gender: string;
  email: string;
  dob: string;
  maritalStatus: string;
  department: string;
  role: string;
};
type EmployeeProfileCardProps = {
  employee: Employee;
};

export function EmployeeProfileCard({ employee }: EmployeeProfileCardProps) {
  return (
    <div className="bg-blue-100 p-4 sm:p-6 md:p-8 rounded-2xl w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto text-center shadow-lg">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt="Employee Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-200"
        />
      </div>

      <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
        Profile
      </div>
      <h2 className="text-lg sm:text-xl font-semibold">{employee.name}</h2>
      <p className="text-sm sm:text-base text-gray-500">{employee.role}</p>
      <div className="mt-2 inline-block px-3 py-1 sm:px-4 sm:py-2 bg-green-100 text-green-700 rounded-md text-xs sm:text-sm">
        Active
      </div>

      <div className="mt-4 space-y-2 text-left text-sm sm:text-base break-words">
        <div className="flex items-center gap-2 sm:gap-3">
          📧 <span className="break-all">{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          📞 <span>8555051803</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          🌐 <span>GMT +5:30</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <select className="w-full p-2 sm:p-3 rounded border text-sm sm:text-base">
          <option>{employee.department || "Department"}</option>
        </select>
        <select className="w-full p-2 sm:p-3 rounded border text-sm sm:text-base">
          <option>{employee.role || "Role"}</option>
        </select>
      </div>
    </div>
  );
}

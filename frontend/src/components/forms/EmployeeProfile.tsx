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
    <div className="bg-blue-100 p-8 rounded-2xl w-120 text-center shadow-lg">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg" // Example stock image
          alt="Employee Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
        />
      </div>

      <div className="text-sm text-gray-500 mb-2">Profile</div>
      <h2 className="text-xl font-semibold">{employee.name}</h2>
      <p className="text-base text-gray-500">{employee.role}</p>
      <div className="mt-2 inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm">
        Active
      </div>

      <div className="mt-4 space-y-3 text-left text-base">
        <div className="flex items-center gap-3">
          📧 <span>{employee.email}</span>
        </div>
        <div className="flex items-center gap-3">
          📞 <span>8555051803</span>
        </div>
        <div className="flex items-center gap-3">
          🌐 <span>GMT +5:30</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <select className="w-full p-3 rounded border text-base">
          <option>{employee.department || "Department"}</option>
        </select>
        <select className="w-full p-3 rounded border text-base">
          <option>{employee.role || "Role"}</option>
        </select>
      </div>
    </div>
  );
}

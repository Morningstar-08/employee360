import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import AddEmployee from "@/pages/AddEmployee";
import EmployeeList from "@/pages/EmployeeList";
import RetentionPrediction from "./pages/RetentionPrediction";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/retention-prediction" element={<RetentionPrediction />} />
      </Routes>
    </Router>
  );
}

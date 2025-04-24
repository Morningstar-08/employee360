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
import LoginPage from "./pages/Login";
import UserProvider from "./contexts/userContext";

export default function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                    <Route path="/employee-list" element={<EmployeeList />} />
                    <Route
                        path="/retention-prediction"
                        element={<RetentionPrediction />}
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
}

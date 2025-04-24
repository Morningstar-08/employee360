import axios from "axios";

export interface Employee {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    Age: number;
    Department: string;
    Education: number;
    EnvironmentSatisfaction: number;
    Gender: string;
    JobInvolvement: number;
    JobLevel: number;
    JobRole: string;
    JobSatisfaction: number;
    MaritalStatus: string;
    MonthlyIncome: number;
    OverTime: string;
    PercentSalaryHike: number;
    PerformanceRating: number;
    WorkLifeBalance: number;
    YearsAtCompany: number;
    YearsSinceLastPromotion: number;
    attrition: string;
    attritionProbability?: number;
    attritionRiskLevel?: string;
    shapExplanations?: string;
}

const API_BASE = "http://localhost:5173/api/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get(`${API_BASE}/getAllEmployees`);
    return response.data;
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
    const response = await axios.get(`${API_BASE}/getEmployeeById/${id}`);
    return response.data;
};

export const getAttritionEmployees = async (): Promise<Employee> => {
    const response = await axios.get(`${API_BASE}/getAttritionEmployees/`);
    return response.data;
};

export const getAllCurrentEmployees = async (): Promise<Employee> => {
    const response = await axios.get(`${API_BASE}/getAllCurrentEmployees/`);
    return response.data;
};

export const addEmployee = async (data: Partial<Employee>) => {
    const response = await axios.post(`${API_BASE}/addEmployee`, data);
    return response.data;
};

export const editEmployee = async (id: string, data: Partial<Employee>) => {
    const response = await axios.post(`${API_BASE}/editEmployee/${id}`, data);
    return response.data;
};

export const removeEmployee = async (id: string) => {
    const response = await axios.patch(`${API_BASE}/removeEmployee/${id}`);
    return response.data;
};

export const getEmployeeAttritionPrediction = async (id: string) => {
    const response = await axios.post(
        `${API_BASE}/employeeAttrition/${id}/predict`
    );
    return response.data;
};

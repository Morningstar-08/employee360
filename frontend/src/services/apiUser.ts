import axios from "axios";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    token?: string;
}

const API_BASE = "http://localhost:8000/api/auth";

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // localStorage.removeItem("accessToken");
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server error:", error.response.data);
            }
        } else if (error.code === "ECONNABORTED") {
            console.log("Request timed out, please try again!");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

// export const signupUser = async (): Promise<User[]> => {
//     const response = await axios.post(`${API_BASE}/signup`);
//     return response.data;
// };

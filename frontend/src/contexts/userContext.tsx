import React, { createContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "../services/apiUser";

// Define the User type (you can replace this with your actual User model)
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    clearUser: () => void;
}

// Default context value
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

// Props for provider
interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/getUserProfile");
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, loading, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

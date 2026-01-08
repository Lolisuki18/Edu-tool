import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, AuthState } from "@/types";
import { STORAGE_KEYS } from "@/constants";

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Validate password with backend
      console.log("Login attempt with password:", password.length > 0);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let mockUser: User;
      if (email === "admin@edu.com") {
        mockUser = {
          id: "1",
          email,
          name: "Admin User",
          role: "admin",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else if (email === "teacher@edu.com") {
        mockUser = {
          id: "2",
          email,
          name: "Teacher User",
          role: "teacher",
          createdBy: "1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else if (email === "leader@edu.com") {
        mockUser = {
          id: "3",
          email,
          name: "Leader User",
          role: "leader",
          groupId: "group-1",
          createdBy: "2",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else {
        mockUser = {
          id: "4",
          email,
          name: "Member User",
          role: "member",
          groupId: "group-1",
          createdBy: "2",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        "mock-token-" + Date.now()
      );
      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

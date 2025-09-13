"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  email: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  data?: unknown;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        setUser({ email: userEmail });
      }
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUser({ email });
        setIsLoggedIn(true);
        // Store token and user info
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userEmail", email);
        }
        return { success: true, data };
      } else {
        return {
          success: false,
          error: data.message || "Invalid credentials",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  };

  const signup = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUser({ email });
        setIsLoggedIn(true);
        // Store token and user info
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userEmail", email);
        }
        return { success: true, data };
      } else {
        return {
          success: false,
          error: data.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        // Add abort controller to cancel any pending requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Force clear everything
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          (key && key.includes("auth")) ||
          key === "user" ||
          key === "token" ||
          key === "userEmail"
        ) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Reset state
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

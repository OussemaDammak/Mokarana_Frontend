"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { checkSession, whoami, logout as logoutService } from "@/lib/auth.service";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
  console.log("🔍 Checking auth..."); // Add this
  try {
    const session = await checkSession();
    console.log("📋 Session response:", session); // Add this
    if (session.isAuthenticated) {
      const userData = await whoami();
      console.log("👤 User data:", userData); // Add this
      if (userData.username) {
        setUser({ username: userData.username });
        setIsAuthenticated(true);
        console.log("✅ User authenticated:", userData.username); // Add this
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
      console.log("❌ Not authenticated"); // Add this
    }
  } catch (error) {
    console.error("Error checking auth:", error);
    setUser(null);
    setIsAuthenticated(false);
  } finally {
    setIsLoading(false);
    console.log("🏁 Loading finished"); // Add this
  }
};

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
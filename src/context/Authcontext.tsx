// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      setUser(response.data.user);
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      console.error("Erro ao registrar", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

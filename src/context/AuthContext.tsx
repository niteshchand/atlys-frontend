"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
};

// Demo accounts (static for this task)
const demoUsers: { [key: string]: string } = {
  "demo@example.com": "password123",
  "test@user.com": "testpass",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string): boolean => {
    if (demoUsers[email] && demoUsers[email] === password) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const signUp = (email: string, password: string) => {
    // Just adds to our in-memory demo users
    demoUsers[email] = password;
    setUser({ email });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

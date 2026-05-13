import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginService, logout as logoutService } from "@/services/AuthService";

type AuthContextData = {
  signed: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const token = await AsyncStorage.getItem("token");
      setSigned(!!token);
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function login(email: string, password: string) {
    const response = await loginService({ email, password });

    if (response.token) {
      setSigned(true);
    }
  }

  async function logout() {
    await logoutService();
    setSigned(false);
  }

  return (
    <AuthContext.Provider value={{ signed, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
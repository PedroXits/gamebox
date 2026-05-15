import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login as loginService,
  register as registerService,
  logout as logoutService
} from "@/services/AuthService";
import { AuthResponse } from "@/models/auth/AuthResponse";
import { RegisterRequest } from "@/models/auth/RegisterRequest";
import { LoginRequest } from "@/models/auth/LoginRequest";

type AuthContextData = {
  signed: boolean;
  loading: boolean;

  // usuário autenticado
  user: AuthResponse | null;

  register: (
    data: RegisterRequest
  ) => Promise<void>;

  login: (
    data: LoginRequest
  ) => Promise<void>;

  logout: () => Promise<void>;
};

export const AuthContext =
  createContext<AuthContextData>(
    {} as AuthContextData
  );

export function AuthProvider({ children }: any) {

  const [signed, setSigned] = useState(false);

  const [loading, setLoading] = useState(true);

  // state do usuário
  const [user, setUser] =
    useState<AuthResponse | null>(null);

  useEffect(() => {

    async function loadStorage() {

      const token =
        await AsyncStorage.getItem("token");

      // carrega usuário salvo
      const userStorage =
        await AsyncStorage.getItem("user");

      if (token && userStorage) {

        setSigned(true);

        setUser(JSON.parse(userStorage));
      }

      setLoading(false);
    }

    loadStorage();

  }, []);

  async function login(data: LoginRequest) {

    const response = await loginService(data);

    if (response.token) {

      // salva o usuário no state
      setUser(response);

      // salva o usuário no storage
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      setSigned(true);
    }
  }

  async function register(data: RegisterRequest) {
    
    const response = await registerService(data);

    if(response.token) {
      setUser(response);

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      setSigned(true);
    }
  }

  async function logout() {

    await logoutService();
    setUser(null);
    await AsyncStorage.removeItem("user");
    setSigned(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        loading,
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
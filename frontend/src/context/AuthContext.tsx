import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  login as loginService,
  logout as logoutService
} from "@/services/AuthService";

import { AuthResponse } from "@/models/auth/AuthResponse";

type AuthContextData = {
  signed: boolean;
  loading: boolean;

  // usuário autenticado
  user: AuthResponse | null;

  login: (
    email: string,
    password: string
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

  async function login(
    email: string,
    password: string
  ) {

    const response = await loginService({
      email,
      password
    });

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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
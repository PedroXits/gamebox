import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest } from "@/models/auth/LoginRequest";
import { RegisterRequest } from "@/models/auth/RegisterRequest";
import { AuthResponse } from "@/models/auth/AuthResponse";

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post("/auth/register", data);

  await AsyncStorage.setItem("token", response.data.token);

  return response.data;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post("/auth/login", data);

  await AsyncStorage.setItem("token", response.data.token);

  return response.data;
}

export async function logout() {
  await AsyncStorage.removeItem("token");
}
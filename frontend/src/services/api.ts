import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.set?.("Authorization", `Bearer ${token}`);
    }

    return config;
  }
);
import axios from "axios";
import { LoginRequest } from "@/models/auth/LoginRequest";
import { RegisterRequest } from "@/models/auth/RegisterRequest";
import { AuthResponse } from "@/models/auth/AuthResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axios.post(
        `${API_URL}/auth/register`,
        data
    );

    await AsyncStorage.setItem(
        "token",
        response.data.token
    );

    return response.data
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post(
        `${API_URL}/auth/login`,
        data
    );

    await AsyncStorage.setItem(
        "token",
        response.data.token
    );

    return response.data;
}

export async function logout() {
    await AsyncStorage.removeItem("token");
}

export async function getToken() {
    return await AsyncStorage.getItem("token");
}

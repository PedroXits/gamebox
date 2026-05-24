import { api } from "@/services/api";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function uploadGameImage(uri: string): Promise<string> {
    const formData = new FormData();

    const fileName = `game-${Date.now()}.jpg`;

    if (Platform.OS === "web") {
        const response = await fetch(uri);
        const blob = await response.blob();

        formData.append("file", blob, fileName);
    } else {
        formData.append("file", {
            uri,
            name: fileName,
            type: "image/jpeg",
        } as any);
    }

    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${API_URL}/uploads/games`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return await response.text();
}
import { api } from "@/services/api";
import { Platform } from "react-native";

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

    const response = await api.post("/uploads/games", formData, {
        transformRequest: (data) => data,
    });

    return response.data;
}
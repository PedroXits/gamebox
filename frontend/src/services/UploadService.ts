import { api } from "@/services/api";

export async function uploadGameImage(uri: string): Promise<string> {
    const formData = new FormData();

    formData.append("file", {
        uri,
        name: `game-${Date.now()}.jpg`,
        type: "image/jpeg",
    } as any);

    const response = await api.post("/uploads/games", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}
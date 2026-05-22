import { api } from "@/services/api";
import { CreateFavoriteRequest } from "@/models/favorite/CreateFavoriteRequest";
import { FavoriteResponse } from "@/models/favorite/FavoriteResponse";

export async function addToFavorite(data: CreateFavoriteRequest): Promise<void> {
    await api.post("/favorites", data);
}

export async function getFavoritesByProfileId(profileId: number): Promise<FavoriteResponse[]> {
    const response = await api.get(`/favorites/profile/${profileId}`);

    return response.data;
}

export async function removeFromFavorite(favoriteId: number): Promise<void> {
    await api.delete(`/favorites/${favoriteId}`);
}
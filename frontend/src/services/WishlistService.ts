import { api } from "@/services/api";
import { CreateWishlistRequest } from "@/models/wishlist/CreateWishlistRequest";
import { WishlistSearchResponse } from "@/models/wishlist/WishlistSearchResponse";

export async function addToWishlist(data: CreateWishlistRequest): Promise<void> {
    await api.post("/wishlist", data);
}

export async function getWishlistByProfileId(profileId: number): Promise<WishlistSearchResponse[]> {
    const response = await api.get(`/wishlist/profile/${profileId}`);

    return response.data;
}

export async function removeFromWishlist(wishlistId: number): Promise<void> {
    await api.delete(`/wishlist/${wishlistId}`);
}
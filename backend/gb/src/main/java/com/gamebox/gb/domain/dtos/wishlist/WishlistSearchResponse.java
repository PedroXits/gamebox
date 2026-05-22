package com.gamebox.gb.domain.dtos.wishlist;

public record WishlistSearchResponse(
        Long wishlistId,
        Long gameId,
        String gameName,
        String gamePhoto,
        String bannerPhoto
) {
}

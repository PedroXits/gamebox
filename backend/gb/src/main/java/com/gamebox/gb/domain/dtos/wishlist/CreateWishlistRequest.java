package com.gamebox.gb.domain.dtos.wishlist;

public record CreateWishlistRequest(
        Long profileId,
        Long gameId
) {
}

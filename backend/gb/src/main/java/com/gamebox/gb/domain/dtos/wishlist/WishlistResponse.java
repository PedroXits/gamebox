package com.gamebox.gb.domain.dtos.wishlist;

import java.time.LocalDateTime;

public record WishlistResponse(
        Long id,
        Long profileId,
        String profileName,
        Long gameId,
        String gameName,
        LocalDateTime createdAt
) {
}

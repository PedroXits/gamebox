package com.gamebox.gb.domain.dtos.favorite;

import java.time.LocalDateTime;

public record FavoriteResponse(
        Long favoriteId,
        Long profileId,
        String profileName,
        Long gameId,
        String gameName,
        String gamePhoto,
        String bannerPhoto,
        LocalDateTime createdAt
) {
}

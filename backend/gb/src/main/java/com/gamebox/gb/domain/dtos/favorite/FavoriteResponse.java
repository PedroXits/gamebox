package com.gamebox.gb.domain.dtos.favorite;

import java.time.LocalDateTime;

public record FavoriteResponse(
        Long id,
        Long profileId,
        String profileName,
        Long gameId,
        String gameName,
        LocalDateTime createdAt
) {
}

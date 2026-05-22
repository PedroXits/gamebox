package com.gamebox.gb.domain.dtos.played;

import java.time.LocalDateTime;

public record PlayedResponse(
        Long playedId,
        Long profileId,
        String profileName,
        Long gameId,
        String gameName,
        String gamePhoto,
        String bannerPhoto,
        LocalDateTime createdAt
) {
}

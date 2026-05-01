package com.gamebox.gb.domain.dtos.played;

import java.time.LocalDateTime;

public record PlayedResponse(
        Long id,
        Long profileId,
        String profileName,
        Long gameId,
        String gameName,
        LocalDateTime createdAt
) {
}

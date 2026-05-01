package com.gamebox.gb.domain.dtos.review;

public record ReviewResponse(
        Long id,
        Long profileId,
        String profileName,
        Long gameId,
        String gameName,
        Double rating,
        String comment
) {
}

package com.gamebox.gb.domain.dtos.review;

public record ReviewSearchResponse(
        Long reviewId,
        Long gameId,
        String profileName,
        Double rating,
        String comment
) {
}

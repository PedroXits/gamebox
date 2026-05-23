package com.gamebox.gb.domain.dtos.review;

public record ReviewSearchResponse(
        Long reviewId,
        Long gameId,
        String profileName,
        String gameName,
        String gamePhoto,
        String bannerPhoto,
        Double rating,
        String comment
) {
}

package com.gamebox.gb.domain.dtos.review;

public record ReviewResponse(
        Long reviewId,
        Long profileId,
        String profileName,
        Long gameId,
        String gameName,
        String gamePhoto,
        String bannerPhoto,
        Double rating,
        String comment
) {
}

package com.gamebox.gb.domain.dtos.review;

public record ReviewSearchResponse(
        Long reviewId,
        Long gameId,
        String profileName,
        String gameName,
        String gamePhoto,
        String bannerPhoto,
        Integer releaseYear,
        Boolean isFavorite,
        Double rating,
        String comment
) {
}

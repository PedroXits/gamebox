package com.gamebox.gb.domain.dtos.review;

public record CreateReviewRequest(
        Long profileId,
        Long gameId,
        Double rating,
        String comment
) {
}

package com.gamebox.gb.domain.dtos.review;

public record UpdateReviewRequest(
        Double rating,
        String comment
) {
}

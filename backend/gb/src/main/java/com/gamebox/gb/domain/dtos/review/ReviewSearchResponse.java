package com.gamebox.gb.domain.dtos.review;

public record ReviewSearchResponse(
        String profileName,
        Double rating,
        String comment
) {
}

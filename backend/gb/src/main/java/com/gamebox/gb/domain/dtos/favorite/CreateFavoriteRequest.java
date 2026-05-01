package com.gamebox.gb.domain.dtos.favorite;

public record CreateFavoriteRequest(
        Long profileId,
        Long gameId
) {
}

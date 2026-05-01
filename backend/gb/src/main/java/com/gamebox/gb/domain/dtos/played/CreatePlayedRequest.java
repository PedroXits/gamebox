package com.gamebox.gb.domain.dtos.played;

public record CreatePlayedRequest(
        Long profileId,
        Long gameId
) {
}

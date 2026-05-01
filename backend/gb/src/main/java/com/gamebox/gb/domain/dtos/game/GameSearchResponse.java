package com.gamebox.gb.domain.dtos.game;

import com.gamebox.gb.domain.enums.Genre;

public record GameSearchResponse(
        Long id,
        String gameName,
        Genre genre,
        String gamePhoto
) {
}

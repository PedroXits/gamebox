package com.gamebox.gb.domain.dtos.game;

import com.gamebox.gb.domain.enums.Genre;

import java.util.List;

public record GameSearchResponse(
        Long id,
        String gameName,
        List<Genre> genres,
        String gamePhoto
) {
}

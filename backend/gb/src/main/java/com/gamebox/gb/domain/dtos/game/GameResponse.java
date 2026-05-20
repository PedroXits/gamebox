package com.gamebox.gb.domain.dtos.game;

import com.gamebox.gb.domain.enums.Genre;

import java.time.LocalDate;
import java.util.List;

public record GameResponse(
        Long id,
        String gameName,
        String gamePhoto,
        String bannerPhoto,
        List<Genre> genres,
        String description,
        LocalDate releaseDate
) {
}

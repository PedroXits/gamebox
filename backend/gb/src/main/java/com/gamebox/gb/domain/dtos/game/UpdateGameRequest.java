package com.gamebox.gb.domain.dtos.game;

import com.gamebox.gb.domain.enums.Genre;

import java.time.LocalDate;
import java.util.List;

public record UpdateGameRequest(
        String gameName,
        List<Genre> genres,
        String description,
        String gamePhoto,
        String bannerPhoto,
        LocalDate releaseDate
) {
}

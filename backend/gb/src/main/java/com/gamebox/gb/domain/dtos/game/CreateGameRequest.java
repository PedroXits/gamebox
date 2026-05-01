package com.gamebox.gb.domain.dtos.game;

import com.gamebox.gb.domain.enums.Genre;

import java.time.LocalDate;

public record CreateGameRequest(
        String gameName,
        String gamePhoto,
        Genre genre,
        String description,
        LocalDate releaseDate
) {
}

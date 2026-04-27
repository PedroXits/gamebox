package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.enums.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findByGenre(Genre genre);

    boolean existsByNameIgnoreCaseAndReleaseDate(String name, LocalDate releaseDate);

    List<Game> findByNameContainingIgnoreCase(String name);
}

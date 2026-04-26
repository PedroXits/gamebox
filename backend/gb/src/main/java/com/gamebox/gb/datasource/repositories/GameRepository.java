package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.enums.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findByGenre(Genre genre);

    List<Game> findByNameContainingIgnoreCase(String name);
}

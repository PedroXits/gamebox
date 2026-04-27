package com.gamebox.gb.services;


import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.enums.Genre;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game createGame(Game game) {
        boolean exists = gameRepository.existsByNameIgnoreCaseAndReleaseDate(
                game.getName(),
                game.getReleaseDate()
        );

        if(exists) {
            throw new RuntimeException("Jogo já está cadastrado!");
        }
        return gameRepository.save(game);
    }

    public List<Game> findByGameGenre(Genre genre) {
        return gameRepository.findByGenre(genre);
    }


}

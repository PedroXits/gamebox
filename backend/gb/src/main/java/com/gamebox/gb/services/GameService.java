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

    public List<Game> findGameByName (String name) {
        if(name == null || name.isBlank()){
            return List.of();
        }

        return gameRepository.findByNameContainingIgnoreCase(name);
    }

    public Game findGameById(Long id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));
    }

    public Game updateGame(Long id, Game updatedGame) {
        Game game = findGameById(id);

        if(updatedGame.getName()!= null) {
            game.setName(updatedGame.getName());
        }

        if(updatedGame.getGenre() != null) {
            game.setGenre(updatedGame.getGenre());
        }

        if(updatedGame.getDescription() != null) {
            game.setDescription(updatedGame.getDescription());
        }

        if(updatedGame.getReleaseDate() != null) {
            game.setReleaseDate(updatedGame.getReleaseDate());
        }
        return gameRepository.save(game);
    }

    public void deleteGameById(Long id) {
        Game game = findGameById(id);
        gameRepository.delete(game);
    }










}

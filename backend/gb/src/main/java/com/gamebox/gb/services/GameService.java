package com.gamebox.gb.services;


import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.domain.dtos.game.CreateGameRequest;
import com.gamebox.gb.domain.dtos.game.GameResponse;
import com.gamebox.gb.domain.dtos.game.GameSearchResponse;
import com.gamebox.gb.domain.dtos.game.UpdateGameRequest;
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

    public GameResponse createGame(CreateGameRequest request) {

        boolean exists = gameRepository.existsByGameNameIgnoreCaseAndReleaseDate(
                request.gameName(),
                request.releaseDate()
        );

        if(exists) {
            throw new RuntimeException("Jogo já está cadastrado!");
        }

        Game game = new Game();

        game.setGameName(request.gameName());
        game.setGenres(request.genres());
        game.setDescription(request.description());
        game.setGamePhoto(request.gamePhoto());
        game.setBannerPhoto(request.bannerPhoto());
        game.setReleaseDate(request.releaseDate());

        Game savedGame = gameRepository.save(game);

        return new GameResponse(
                savedGame.getId(),
                savedGame.getGameName(),
                savedGame.getGamePhoto(),
                savedGame.getBannerPhoto(),
                savedGame.getGenres(),
                savedGame.getDescription(),
                savedGame.getReleaseDate()
        );
    }

    public List<GameSearchResponse> findByGameGenre(Genre genre) {
        List<Game> games = gameRepository.findByGenresContaining(genre);

        return games.stream()
                .map(game -> new GameSearchResponse(
                        game.getId(),
                        game.getGameName(),
                        game.getGenres(),
                        game.getGamePhoto(),
                        game.getBannerPhoto()
                ))
                .toList();
    }

    public List<GameSearchResponse> findGameByName (String name) {
        if(name == null || name.isBlank()){
            return List.of();
        }

        List<Game> games = gameRepository.findByGameNameContainingIgnoreCase(name);

        return games.stream()
                .map(game -> new GameSearchResponse(
                        game.getId(),
                        game.getGameName(),
                        game.getGenres(),
                        game.getGamePhoto(),
                        game.getBannerPhoto()
                ))
                .toList();
    }

    public List<GameSearchResponse> findAllGames() {

        List<Game> games = gameRepository.findAll();

        return games.stream()
                .map(game -> new GameSearchResponse(
                        game.getId(),
                        game.getGameName(),
                        game.getGenres(),
                        game.getGamePhoto(),
                        game.getBannerPhoto()
                ))
                .toList();
    }

    public GameResponse findGameById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        return new GameResponse(
                game.getId(),
                game.getGameName(),
                game.getGamePhoto(),
                game.getBannerPhoto(),
                game.getGenres(),
                game.getDescription(),
                game.getReleaseDate()
        );
    }

    public List<GameSearchResponse> findRecentGames() {
        List<Game> games = gameRepository.findAllByOrderByReleaseDateDesc();

        return games.stream()
                .map(game -> new GameSearchResponse(
                        game.getId(),
                        game.getGameName(),
                        game.getGenres(),
                        game.getGamePhoto(),
                        game.getBannerPhoto()
                ))
                .toList();
    }

    public GameResponse updateGame(Long id, UpdateGameRequest request) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        if(request.gameName()!= null && !request.gameName().isBlank()) {
            game.setGameName(request.gameName());
        }

        if(request.genres() != null) {
            game.setGenres(request.genres());
        }

        if(request.description() != null  && !request.description().isBlank()) {
            game.setDescription(request.description());
        }

        if(request.releaseDate() != null) {
            game.setReleaseDate(request.releaseDate());
        }

        if(request.gamePhoto() != null && !request.gamePhoto().isBlank()) {
            game.setGamePhoto(request.gamePhoto());
        }

        if(request.bannerPhoto() != null && !request.bannerPhoto().isBlank()) {
            game.setBannerPhoto(request.bannerPhoto());
        }

        Game updatedGame = gameRepository.save(game);

        return new GameResponse(
                updatedGame.getId(),
                updatedGame.getGameName(),
                updatedGame.getGamePhoto(),
                updatedGame.getBannerPhoto(),
                updatedGame.getGenres(),
                updatedGame.getDescription(),
                updatedGame.getReleaseDate()
        );
    }

    public void deleteGameById(Long id) {
        Game game = gameRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        gameRepository.delete(game);
    }










}

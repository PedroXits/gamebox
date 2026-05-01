package com.gamebox.gb.controllers;

import com.gamebox.gb.domain.dtos.game.CreateGameRequest;
import com.gamebox.gb.domain.dtos.game.GameResponse;
import com.gamebox.gb.domain.dtos.game.GameSearchResponse;
import com.gamebox.gb.domain.dtos.game.UpdateGameRequest;
import com.gamebox.gb.domain.enums.Genre;
import com.gamebox.gb.services.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping
    public ResponseEntity<GameResponse> createGame(@RequestBody CreateGameRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(gameService.createGame(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.findGameById(id));
    }

    @GetMapping("/genre")
    public ResponseEntity<List<GameSearchResponse>> findByGenre(@RequestParam Genre genre) {
        return ResponseEntity.ok(gameService.findByGameGenre(genre));
    }

    @GetMapping("/search")
    public ResponseEntity<List<GameSearchResponse>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(gameService.findGameByName(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameResponse> updateGame(
            @PathVariable Long id,
            @RequestBody UpdateGameRequest request
    ) {
        return ResponseEntity.ok(gameService.updateGame(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        gameService.deleteGameById(id);
        return ResponseEntity.noContent().build();
    }
}
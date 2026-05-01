package com.gamebox.gb.controllers;

import com.gamebox.gb.domain.dtos.favorite.CreateFavoriteRequest;
import com.gamebox.gb.domain.dtos.favorite.FavoriteResponse;
import com.gamebox.gb.domain.dtos.favorite.FavoriteSearchResponse;
import com.gamebox.gb.services.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<FavoriteResponse> createFavorite(@RequestBody CreateFavoriteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(favoriteService.createFavorite(request));
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<FavoriteResponse>> findByProfileId(@PathVariable Long profileId) {
        return ResponseEntity.ok(favoriteService.findByProfileId(profileId));
    }

    @GetMapping("/profile/{profileId}/games")
    public ResponseEntity<List<FavoriteSearchResponse>> findGamesByProfileId(@PathVariable Long profileId) {
        return ResponseEntity.ok(favoriteService.findGamesByProfileId(profileId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        favoriteService.deleteFavorite(id);
        return ResponseEntity.noContent().build();
    }
}
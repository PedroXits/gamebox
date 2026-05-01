package com.gamebox.gb.controllers;

import com.gamebox.gb.domain.dtos.played.CreatePlayedRequest;
import com.gamebox.gb.domain.dtos.played.PlayedResponse;
import com.gamebox.gb.services.PlayedService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/played")
public class PlayedController {

    private final PlayedService playedService;

    public PlayedController(PlayedService playedService) {
        this.playedService = playedService;
    }

    @PostMapping
    public ResponseEntity<PlayedResponse> createPlayed(@RequestBody CreatePlayedRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(playedService.createPlayed(request));
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<PlayedResponse>> findByProfileId(@PathVariable Long profileId) {
        return ResponseEntity.ok(playedService.findByProfileId(profileId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayed(@PathVariable Long id) {
        playedService.deletePlayed(id);
        return ResponseEntity.noContent().build();
    }
}
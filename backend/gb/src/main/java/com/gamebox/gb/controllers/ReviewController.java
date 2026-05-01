package com.gamebox.gb.controllers;

import com.gamebox.gb.domain.dtos.review.CreateReviewRequest;
import com.gamebox.gb.domain.dtos.review.ReviewResponse;
import com.gamebox.gb.domain.dtos.review.ReviewSearchResponse;
import com.gamebox.gb.domain.dtos.review.UpdateReviewRequest;
import com.gamebox.gb.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody CreateReviewRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(request));
    }

    @GetMapping("/game/{gameId}")
    public ResponseEntity<List<ReviewSearchResponse>> findByGameId(@PathVariable Long gameId) {
        return ResponseEntity.ok(reviewService.findReviewByGameId(gameId));
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<ReviewSearchResponse>> findByProfileId(@PathVariable Long profileId) {
        return ResponseEntity.ok(reviewService.findReviewByProfileId(profileId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long id,
            @RequestBody UpdateReviewRequest request
    ) {
        return ResponseEntity.ok(reviewService.updateReview(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
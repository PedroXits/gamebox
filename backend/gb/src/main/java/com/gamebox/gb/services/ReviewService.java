package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.datasource.repositories.PlayedRepository;
import com.gamebox.gb.datasource.repositories.ReviewRepository;
import com.gamebox.gb.domain.entities.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final GameRepository gameRepository;
    private final ReviewRepository reviewRepository;
    private final PlayedRepository playedRepository;

    public ReviewService(GameRepository gameRepository, ReviewRepository reviewRepository, PlayedRepository playedRepository) {
        this.gameRepository = gameRepository;
        this.reviewRepository = reviewRepository;
        this.playedRepository = playedRepository;
    }

    public Review createReview(Review review) {
        Long profileId = review.getProfile().getId();
        Long gameId = review.getGame().getId();

        if(reviewRepository.existsByProfileIdAndGameId(profileId, gameId)){
            throw new RuntimeException("Você já avaliou esse jogo.");
        }

        boolean played = playedRepository.findByProfileId(profileId)
                .stream().anyMatch(p -> p.getGame().getId().equals(gameId));

        if(!played) {
            throw new RuntimeException("Você precisa ter jogado para avaliar.");
        }

        if(review.getRating() < 0 || review.getRating() > 5) {
            throw new RuntimeException("Nota inválida.");
        }

        return reviewRepository.save(review);
    }

    public List<Review> findReviewByGameId(Long gameId) {

        if (!gameRepository.existsById(gameId)) {
            throw new RuntimeException("Jogo não encontrado");
        }

        return reviewRepository.findByGameId(gameId);
    }





}

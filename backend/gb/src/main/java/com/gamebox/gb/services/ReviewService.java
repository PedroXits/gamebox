package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.datasource.repositories.PlayedRepository;
import com.gamebox.gb.datasource.repositories.ProfileRepository;
import com.gamebox.gb.datasource.repositories.ReviewRepository;
import com.gamebox.gb.domain.dtos.review.CreateReviewRequest;
import com.gamebox.gb.domain.dtos.review.ReviewResponse;
import com.gamebox.gb.domain.dtos.review.ReviewSearchResponse;
import com.gamebox.gb.domain.dtos.review.UpdateReviewRequest;
import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.entities.Profile;
import com.gamebox.gb.domain.entities.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final GameRepository gameRepository;
    private final ReviewRepository reviewRepository;
    private final PlayedRepository playedRepository;
    private final ProfileRepository profileRepository;

    public ReviewService(GameRepository gameRepository, ReviewRepository reviewRepository, PlayedRepository playedRepository, ProfileRepository profileRepository) {
        this.gameRepository = gameRepository;
        this.reviewRepository = reviewRepository;
        this.playedRepository = playedRepository;
        this.profileRepository = profileRepository;
    }

    public ReviewResponse createReview(CreateReviewRequest request) {

        Long profileId = request.profileId();
        Long gameId = request.gameId();

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        if(reviewRepository.existsByProfileIdAndGameId(profileId, gameId)) {
            throw new RuntimeException("Você já avaliou esse jogo.");
        }

        boolean played = playedRepository.findByProfileId(profileId)
                .stream()
                .anyMatch(p -> p.getGame().getId().equals(gameId));

        if(!played) {
            throw new RuntimeException("Você precisa ter jogado para avaliar.");
        }

        if(request.rating() < 0.5 || request.rating() > 5) {
            throw new RuntimeException("Nota inválida.");
        }

        Review review = new Review();

        review.setGame(game);
        review.setProfile(profile);
        review.setRating(request.rating());
        review.setComment(request.comment());

        Review savedReview = reviewRepository.save(review);

        return new ReviewResponse(
                savedReview.getId(),
                savedReview.getProfile().getId(),
                savedReview.getProfile().getProfileName(),
                savedReview.getGame().getId(),
                savedReview.getGame().getGameName(),
                savedReview.getRating(),
                savedReview.getComment()
        );
    }

    public List<ReviewSearchResponse> findReviewByGameId(Long gameId) {

        gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        List<Review> reviews = reviewRepository.findByGameId(gameId);

        return reviews.stream()
                .map(review -> new ReviewSearchResponse(
                        review.getProfile().getProfileName(),
                        review.getRating(),
                        review.getComment()
                ))
                .toList();
    }

    public List<ReviewSearchResponse> findReviewByProfileId(Long profileId) {

        profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        List<Review> reviews = reviewRepository.findByProfileId(profileId);

        return reviews.stream()
                .map(review -> new ReviewSearchResponse(
                        review.getProfile().getProfileName(),
                        review.getRating(),
                        review.getComment()
                ))
                .toList();
    }

    public ReviewResponse updateReview(Long id, UpdateReviewRequest request) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review não encontrada."));

        if (request.rating() != null) {
            if (request.rating() < 0.5 || request.rating() > 5) {
                throw new RuntimeException("Nota inválida.");
            }
            review.setRating(request.rating());
        }

        if (request.comment() != null && !request.comment().isBlank()) {
            review.setComment(request.comment());
        }

        Review updated = reviewRepository.save(review);

        return new ReviewResponse(
                updated.getId(),
                updated.getProfile().getId(),
                updated.getProfile().getProfileName(),
                updated.getGame().getId(),
                updated.getGame().getGameName(),
                updated.getRating(),
                updated.getComment()
        );
    }

    public void deleteReview(Long id) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review não encontrada."));

        reviewRepository.delete(review);
    }











}

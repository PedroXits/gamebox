package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByGameId(Long gameId);
    List<Review> findByProfileId(Long profileId);
    boolean existsByProfileIdAndGameId(Long profileId, Long gameId);
}

package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByProfileId(Long profileId);

    boolean existsByProfileIdAndGameId(Long profileId, Long gameId);

}

package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Played;
import com.gamebox.gb.domain.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayedRepository extends JpaRepository<Played, Long> {
    List<Played> findByProfileId(Long profileId);

    boolean existsByProfileIdAndGameId(Long profileId, Long gameId);

    Long profile(Profile profile);
}

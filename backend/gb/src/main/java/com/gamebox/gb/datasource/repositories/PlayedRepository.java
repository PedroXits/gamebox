package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Played;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayedRepository extends JpaRepository<Played, Long> {
    List<Played> findByProfileId(Long profileId);
}

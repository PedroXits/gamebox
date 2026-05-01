package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByProfileName(String profileName);
    boolean existsByUserId(Long userId);

}

package com.gamebox.gb.datasource.repositories;

import com.gamebox.gb.domain.entities.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByProfileId(Long profileId);
}

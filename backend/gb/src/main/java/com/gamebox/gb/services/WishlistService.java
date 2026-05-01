package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.datasource.repositories.ProfileRepository;
import com.gamebox.gb.datasource.repositories.WishlistRepository;
import com.gamebox.gb.domain.dtos.wishlist.CreateWishlistRequest;
import com.gamebox.gb.domain.dtos.wishlist.WishlistResponse;
import com.gamebox.gb.domain.dtos.wishlist.WishlistSearchResponse;
import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.entities.Profile;
import com.gamebox.gb.domain.entities.Wishlist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProfileRepository profileRepository;
    private final GameRepository gameRepository;

    public WishlistService(WishlistRepository wishlistRepository,
                           ProfileRepository profileRepository,
                           GameRepository gameRepository) {
        this.wishlistRepository = wishlistRepository;
        this.profileRepository = profileRepository;
        this.gameRepository = gameRepository;
    }

    public WishlistResponse createWishlist(CreateWishlistRequest request) {

        Profile profile = profileRepository.findById(request.profileId())
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        Game game = gameRepository.findById(request.gameId())
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        if (wishlistRepository.existsByProfileIdAndGameId(profile.getId(), game.getId())) {
            throw new RuntimeException("Esse jogo já está na wishlist.");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setProfile(profile);
        wishlist.setGame(game);

        Wishlist saved = wishlistRepository.save(wishlist);

        return new WishlistResponse(
                saved.getId(),
                saved.getProfile().getId(),
                saved.getProfile().getProfileName(),
                saved.getGame().getId(),
                saved.getGame().getGameName(),
                saved.getCreatedAt()
        );
    }

    public List<WishlistSearchResponse> findByProfileId(Long profileId) {

        profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        List<Wishlist> wishlist = wishlistRepository.findByProfileId(profileId);

        return wishlist.stream()
                .map(w -> new WishlistSearchResponse(
                        w.getGame().getGameName(),
                        w.getGame().getGamePhoto()
                ))
                .toList();
    }

    public void deleteWishlist(Long id) {

        Wishlist wishlist = wishlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro não encontrado."));

        wishlistRepository.delete(wishlist);
    }
}

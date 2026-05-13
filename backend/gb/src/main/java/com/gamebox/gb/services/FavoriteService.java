package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.FavoriteRepository;
import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.datasource.repositories.ProfileRepository;
import com.gamebox.gb.domain.dtos.favorite.CreateFavoriteRequest;
import com.gamebox.gb.domain.dtos.favorite.FavoriteResponse;
import com.gamebox.gb.domain.dtos.favorite.FavoriteSearchResponse;
import com.gamebox.gb.domain.entities.Favorite;
import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.entities.Profile;
import com.gamebox.gb.domain.entities.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final ProfileRepository profileRepository;
    private final GameRepository gameRepository;

    public FavoriteService(FavoriteRepository favoriteRepository,
                           ProfileRepository profileRepository,
                           GameRepository gameRepository) {
        this.favoriteRepository = favoriteRepository;
        this.profileRepository = profileRepository;
        this.gameRepository = gameRepository;
    }

    public FavoriteResponse createFavorite(CreateFavoriteRequest request) {

        Profile profile = profileRepository.findById(request.profileId())
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User loggedUser = (User) authentication.getPrincipal();

        if (!profile.getUser().getId().equals(loggedUser.getId())) {
            throw new RuntimeException("Acesso negado.");
        }

        Game game = gameRepository.findById(request.gameId())
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        if (favoriteRepository.existsByProfileIdAndGameId(profile.getId(), game.getId())) {
            throw new RuntimeException("Esse jogo já está nos favoritos.");
        }

        Favorite favorite = new Favorite();
        favorite.setProfile(profile);
        favorite.setGame(game);

        Favorite saved = favoriteRepository.save(favorite);

        return new FavoriteResponse(
                saved.getId(),
                saved.getProfile().getId(),
                saved.getProfile().getProfileName(),
                saved.getGame().getId(),
                saved.getGame().getGameName(),
                saved.getCreatedAt()
        );
    }

    public List<FavoriteResponse> findByProfileId(Long profileId) {

        profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        List<Favorite> favorites = favoriteRepository.findByProfileId(profileId);

        return favorites.stream()
                .map(f -> new FavoriteResponse(
                        f.getId(),
                        f.getProfile().getId(),
                        f.getProfile().getProfileName(),
                        f.getGame().getId(),
                        f.getGame().getGameName(),
                        f.getCreatedAt()
                ))
                .toList();
    }

    public List<FavoriteSearchResponse> findGamesByProfileId(Long profileId) {

        profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        List<Favorite> favorites = favoriteRepository.findByProfileId(profileId);

        return favorites.stream()
                .map(f -> new FavoriteSearchResponse(
                        f.getGame().getGameName(),
                        f.getGame().getGamePhoto()
                ))
                .toList();
    }

    public void deleteFavorite(Long id) {

        Favorite favorite = favoriteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Favorito não encontrado."));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User loggedUser = (User) authentication.getPrincipal();

        if(!favorite.getProfile().getUser().getId().equals(loggedUser.getId())) {
            throw new RuntimeException("Acesso negado.");
        }

        favoriteRepository.delete(favorite);
    }


}

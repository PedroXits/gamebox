package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.*;
import com.gamebox.gb.domain.dtos.favorite.FavoriteSearchResponse;
import com.gamebox.gb.domain.dtos.played.PlayedResponse;
import com.gamebox.gb.domain.dtos.profile.CreateProfileRequest;
import com.gamebox.gb.domain.dtos.profile.ProfileDashboardResponse;
import com.gamebox.gb.domain.dtos.profile.ProfileResponse;
import com.gamebox.gb.domain.dtos.profile.UpdateProfileRequest;
import com.gamebox.gb.domain.dtos.review.ReviewSearchResponse;
import com.gamebox.gb.domain.dtos.wishlist.WishlistSearchResponse;
import com.gamebox.gb.domain.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final PlayedRepository playedRepository;
    private final FavoriteRepository favoriteRepository;
    private final ReviewRepository reviewRepository;
    private final WishlistRepository wishlistRepository;

    public ProfileService(ProfileRepository profileRepository,
                          UserRepository userRepository,
                          PlayedRepository playedRepository,
                          FavoriteRepository favoriteRepository,
                          WishlistRepository wishlistRepository,
                          ReviewRepository reviewRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.playedRepository = playedRepository;
        this.favoriteRepository = favoriteRepository;
        this.reviewRepository = reviewRepository;
        this.wishlistRepository = wishlistRepository;
    }

    public ProfileResponse createProfile(CreateProfileRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if(profileRepository.existsByUserId(request.userId())) {
            throw new RuntimeException("Usuário já possui perfil.");
        }

        Profile profile = new Profile();

        profile.setUser(user);
        profile.setProfileName(request.profileName());
        profile.setProfilePhoto(request.profilePhoto());

        Profile savedProfile = profileRepository.save(profile);

        return new ProfileResponse(
                savedProfile.getId(),
                savedProfile.getProfileName(),
                savedProfile.getProfilePhoto()
        );
    }

    public ProfileResponse findByProfileName(String profileName) {
        Profile profile = profileRepository.findByProfileName(profileName)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        return new ProfileResponse(
                profile.getId(),
                profile.getProfileName(),
                profile.getProfilePhoto()
        );
    }

    public ProfileResponse findProfileById(Long id){
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        return new ProfileResponse(
                profile.getId(),
                profile.getProfileName(),
                profile.getProfilePhoto()
        );
    }

    public ProfileDashboardResponse getDashboard(Long profileId) {

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        List<Played> played = playedRepository.findByProfileId(profileId);
        List<Favorite> favorites = favoriteRepository.findByProfileId(profileId);
        List<Wishlist> wishlist = wishlistRepository.findByProfileId(profileId);
        List<Review> reviews = reviewRepository.findByProfileId(profileId);

        return new ProfileDashboardResponse(
                new ProfileResponse(
                        profile.getId(),
                        profile.getProfileName(),
                        profile.getProfilePhoto()
                ),

                played.stream()
                        .map(p -> new PlayedResponse(
                                p.getId(),
                                p.getProfile().getId(),
                                p.getProfile().getProfileName(),
                                p.getGame().getId(),
                                p.getGame().getGameName(),
                                p.getCreatedAt()
                        ))
                        .toList(),

                favorites.stream()
                        .map(f -> new FavoriteSearchResponse(
                                f.getGame().getGameName(),
                                f.getGame().getGamePhoto()
                        ))
                        .toList(),

                wishlist.stream()
                        .map(w -> new WishlistSearchResponse(
                                w.getGame().getGameName(),
                                w.getGame().getGamePhoto()
                        ))
                        .toList(),

                reviews.stream()
                        .map(r -> new ReviewSearchResponse(
                                r.getProfile().getProfileName(),
                                r.getRating(),
                                r.getComment()
                        ))
                        .toList()
        );
    }

    public ProfileResponse updateProfile(Long id, UpdateProfileRequest request) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        if(request.profileName() != null) {

            if(request.profileName().isBlank()) {
                throw new RuntimeException("Nome inválido.");
            }
            profile.setProfileName(request.profileName());
        }

        if(request.profilePhoto() != null) {
            profile.setProfilePhoto(request.profilePhoto());
        }

        Profile updatedProfile = profileRepository.save(profile);

        return new ProfileResponse(
                updatedProfile.getId(),
                updatedProfile.getProfileName(),
                updatedProfile.getProfilePhoto()
        );
    }

    public void deleteProfileById(Long id) {
        Profile profile = profileRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        profileRepository.delete(profile);
    }



}

package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.ProfileRepository;
import com.gamebox.gb.datasource.repositories.UserRepository;
import com.gamebox.gb.domain.dtos.profile.CreateProfileRequest;
import com.gamebox.gb.domain.dtos.profile.ProfileResponse;
import com.gamebox.gb.domain.dtos.profile.UpdateProfileRequest;
import com.gamebox.gb.domain.entities.Profile;
import com.gamebox.gb.domain.entities.User;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
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

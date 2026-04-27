package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.ProfileRepository;
import com.gamebox.gb.domain.entities.Profile;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile findByProfileName(String profileName) {
        return profileRepository.findByProfileName(profileName)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));
    }

    public Profile findProfileById(Long id){
        return profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));
    }

    public Profile updateProfile(Long id, Profile updatedProfile) {
        Profile profile = findProfileById(id);

        if(updatedProfile.getProfileName() != null) {

            if(updatedProfile.getProfileName().isBlank()) {
                throw new RuntimeException("Nome inválido.");
            }
            profile.setProfileName(updatedProfile.getProfileName());
        }

        if(updatedProfile.getPhoto() != null) {
            profile.setPhoto(updatedProfile.getPhoto());
        }
        return profileRepository.save(profile);
    }

    public void deleteProfileById(Long id) {
        Profile profile = findProfileById(id);
        profileRepository.delete(profile);
    }



}

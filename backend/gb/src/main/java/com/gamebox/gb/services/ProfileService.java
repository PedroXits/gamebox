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

        profile.setProfileName(updatedProfile.getProfileName());
        profile.setPhoto(updatedProfile.getPhoto());

        return profileRepository.save(profile);
    }

    public void deleteProfileById(Long id) {
        Profile profile = findProfileById(id);
        profileRepository.delete(profile);
    }



}

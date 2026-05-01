package com.gamebox.gb.controllers;

import com.gamebox.gb.domain.dtos.profile.CreateProfileRequest;
import com.gamebox.gb.domain.dtos.profile.ProfileResponse;
import com.gamebox.gb.domain.dtos.profile.UpdateProfileRequest;
import com.gamebox.gb.services.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<ProfileResponse> createProfile(@RequestBody CreateProfileRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(profileService.createProfile(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.findProfileById(id));
    }

    @GetMapping("/name")
    public ResponseEntity<ProfileResponse> findByName(@RequestParam String profileName) {
        return ResponseEntity.ok(profileService.findByProfileName(profileName));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileResponse> updateProfile(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(profileService.updateProfile(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        profileService.deleteProfileById(id);
        return ResponseEntity.noContent().build();
    }
}
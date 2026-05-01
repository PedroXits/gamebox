package com.gamebox.gb.domain.dtos.profile;

public record CreateProfileRequest(
        String profileName,
        String profilePhoto,
        Long userId
) {
}

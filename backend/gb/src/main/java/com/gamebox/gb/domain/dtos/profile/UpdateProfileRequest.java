package com.gamebox.gb.domain.dtos.profile;

public record UpdateProfileRequest(
        String profileName,
        String profilePhoto
) {
}

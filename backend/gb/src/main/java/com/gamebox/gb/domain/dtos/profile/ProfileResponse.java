package com.gamebox.gb.domain.dtos.profile;

public record ProfileResponse(
        Long id,
        String profileName,
        String profilePhoto
) {
}

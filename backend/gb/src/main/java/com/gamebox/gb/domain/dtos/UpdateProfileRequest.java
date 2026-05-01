package com.gamebox.gb.domain.dtos;

public record UpdateProfileRequest(
    String profileName,
    String photo
) {
}

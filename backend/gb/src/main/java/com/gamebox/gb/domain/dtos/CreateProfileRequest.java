package com.gamebox.gb.domain.dtos;

public record CreateProfileRequest(
    String profileName,
    String photo,
    Long userId
) {
}

package com.gamebox.gb.domain.dtos;

public record ProfileResponse(
    Long id,
    String profileName,
    String photo
) {
}

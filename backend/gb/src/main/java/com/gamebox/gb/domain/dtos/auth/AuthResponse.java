package com.gamebox.gb.domain.dtos.auth;

public record AuthResponse(
        String token,
        Long userId,
        String email,
        String username
) {
}

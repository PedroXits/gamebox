package com.gamebox.gb.domain.dtos.auth;

public record RegisterRequest(
        String email,
        String password,
        String username
) {
}

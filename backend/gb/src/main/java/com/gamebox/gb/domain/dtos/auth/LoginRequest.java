package com.gamebox.gb.domain.dtos.auth;

public record LoginRequest(
        String email,
        String password
) {
}

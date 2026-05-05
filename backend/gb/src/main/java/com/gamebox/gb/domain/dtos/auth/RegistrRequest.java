package com.gamebox.gb.domain.dtos.auth;

public record RegistrRequest(
        String email,
        String password,
        String username
) {
}

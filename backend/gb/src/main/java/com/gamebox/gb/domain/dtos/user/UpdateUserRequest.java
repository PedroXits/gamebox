package com.gamebox.gb.domain.dtos.user;

public record UpdateUserRequest(
        String email,
        String username
) {
}

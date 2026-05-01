package com.gamebox.gb.domain.dtos.user;

public record UserResponse(
        Long id,
        String email,
        String username
) {
}

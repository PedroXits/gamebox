package com.gamebox.gb.domain.dtos;

public record UserResponse(
    Long id,
    String email,
    String username
) {
}

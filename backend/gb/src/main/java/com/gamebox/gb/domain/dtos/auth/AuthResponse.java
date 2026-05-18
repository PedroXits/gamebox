package com.gamebox.gb.domain.dtos.auth;

import com.gamebox.gb.domain.enums.Role;

public record AuthResponse(
        String token,
        Long userId,
        String email,
        String username,
        Long profileId,
        Role role
) {
}

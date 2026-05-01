package com.gamebox.gb.domain.dtos;

import com.gamebox.gb.domain.enums.Role;

public record UpdateUserRequest(
    String email,
    String username
) {
}

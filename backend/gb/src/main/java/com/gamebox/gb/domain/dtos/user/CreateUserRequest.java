package com.gamebox.gb.domain.dtos.user;

import com.gamebox.gb.domain.enums.Role;

public record CreateUserRequest(
       String email,
       String password,
       String username,
       Role role
) {
}

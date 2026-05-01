package com.gamebox.gb.domain.dtos;

public record CreateUserRequest(
   String email,
   String password,
   String username
) {
}

package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.UserRepository;
import com.gamebox.gb.domain.dtos.auth.AuthResponse;
import com.gamebox.gb.domain.dtos.auth.RegistrRequest;
import com.gamebox.gb.domain.entities.User;
import com.gamebox.gb.domain.enums.Role;
import com.gamebox.gb.security.JwtService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegistrRequest request) {

        userRepository.findByEmail(request.email())
                .ifPresent(user -> {
                    throw new RuntimeException("Email já está cadastrado.");
                });

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(request.password());
        user.setUsername(request.username());
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getUsername()
        );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getUsername()
        );
    }


}

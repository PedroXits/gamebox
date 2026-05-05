package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.UserRepository;
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





}

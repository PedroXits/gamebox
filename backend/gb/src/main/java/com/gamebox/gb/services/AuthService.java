package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.ProfileRepository;
import com.gamebox.gb.datasource.repositories.UserRepository;
import com.gamebox.gb.domain.dtos.auth.AuthResponse;
import com.gamebox.gb.domain.dtos.auth.LoginRequest;
import com.gamebox.gb.domain.dtos.auth.RegisterRequest;
import com.gamebox.gb.domain.entities.Profile;
import com.gamebox.gb.domain.entities.User;
import com.gamebox.gb.domain.enums.Role;
import com.gamebox.gb.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ProfileRepository profileRepository;

    public AuthService(UserRepository userRepository,
                       JwtService jwtService,
                       BCryptPasswordEncoder passwordEncoder,
                       ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.profileRepository = profileRepository;
    }

    public AuthResponse register(RegisterRequest request) {

        System.out.println("ENTROU NO REGISTER");

        userRepository.findByEmail(request.email())
                .ifPresent(user -> {
                    throw new RuntimeException("Email já está cadastrado.");
                });

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setUsername(request.username());
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        Profile profile = new Profile();

        String profileName;

        do {
            int randomNumber = (int) (Math.random() * 9000) + 1000;
            profileName = "User" + randomNumber;
        } while (profileRepository.findByProfileName(profileName).isPresent());

        profile.setProfileName(profileName);
        profile.setUser(savedUser);

        Profile savedProfile = profileRepository.save(profile);

        String token = jwtService.generateToken(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getUsername()
        );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getUsername(),
                savedProfile.getId()
        );
    }

    public AuthResponse login(LoginRequest request) {

        System.out.println("ENTROU NO LOGIN");

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        Profile profile = user.getProfile();

        String token = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getUsername()
        );

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                profile.getId()
        );
    }
}

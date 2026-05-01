package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.UserRepository;
import com.gamebox.gb.domain.dtos.user.CreateUserRequest;
import com.gamebox.gb.domain.dtos.user.UpdateUserRequest;
import com.gamebox.gb.domain.dtos.user.UserResponse;
import com.gamebox.gb.domain.entities.User;
import com.gamebox.gb.domain.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse createUser(CreateUserRequest request) {

        userRepository.findByEmail(request.email())
                .ifPresent(u -> {
                    throw new RuntimeException("Email já está cadastrado!");
                });

        User user = new User();

        user.setEmail(request.email());
        user.setPassword(request.password());
        user.setUsername(request.username());
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getUsername()
        );
    }

    public UserResponse findUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername()
        );
    }

    public UserResponse findUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername()
        );
    }

    public UserResponse updateUser(Long id, UpdateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (request.username() != null && !request.username().isBlank()) {
            user.setUsername(request.username());
        }

        if (request.email() != null && !request.email().isBlank()) {
            user.setEmail(request.email());
        }

        User updatedUser = userRepository.save(user);

        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getEmail(),
                updatedUser.getUsername()
        );
    }

    public void deleteUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        userRepository.delete(user);
    }
}
package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.UserRepository;
import com.gamebox.gb.domain.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static org.springframework.data.util.ClassUtils.ifPresent;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {

        userRepository.findByEmail(user.getEmail())
        .ifPresent(u -> {
            throw new RuntimeException("Email já está cadastrado!");
        });
        return userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
    }

    public User updateUser(Long id, User updatedUser) {
        User user = findById(id);

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());

        return userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }
}

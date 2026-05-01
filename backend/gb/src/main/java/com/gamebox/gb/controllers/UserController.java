package com.gamebox.gb.controllers;

import com.gamebox.gb.domain.dtos.user.CreateUserRequest;
import com.gamebox.gb.domain.dtos.user.UpdateUserRequest;
import com.gamebox.gb.domain.dtos.user.UserResponse;
import com.gamebox.gb.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.createUser(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping("/email")
    public ResponseEntity<UserResponse> findByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

}

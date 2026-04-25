package com.gamebox.gb.domain.entities;

import com.gamebox.gb.domain.enums.Role;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String username;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "user")
    private Profile profile;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}

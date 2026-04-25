package com.gamebox.gb.domain.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}

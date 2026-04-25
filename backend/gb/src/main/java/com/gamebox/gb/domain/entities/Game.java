package com.gamebox.gb.domain.entities;

import com.gamebox.gb.domain.enums.Genre;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "release")
    private LocalDate releaseDate;

    @OneToMany(mappedBy = "game")
    private List<Review> reviews;
}

package com.gamebox.gb.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"profile_id", "game_id"}),
        indexes = {
                @Index(name = "idx_fav_profile", columnList = "profile_id"),
                @Index(name = "idx_fav_game", columnList = "game_id")
        }
)
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

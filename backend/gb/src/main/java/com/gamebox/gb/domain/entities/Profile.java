package com.gamebox.gb.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String profileName;
    private String photo;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    @OneToMany(mappedBy = "profile")
    private List<Review> reviews;

    @OneToMany(mappedBy = "profile")
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "profile")
    private List<Wishlist> wishlist;
}

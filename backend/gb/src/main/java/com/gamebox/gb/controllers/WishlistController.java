package com.gamebox.gb.controllers;

import com.gamebox.gb.domain.dtos.wishlist.CreateWishlistRequest;
import com.gamebox.gb.domain.dtos.wishlist.WishlistResponse;
import com.gamebox.gb.domain.dtos.wishlist.WishlistSearchResponse;
import com.gamebox.gb.services.WishlistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping
    public ResponseEntity<WishlistResponse> createWishlist(@RequestBody CreateWishlistRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(wishlistService.createWishlist(request));
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<WishlistSearchResponse>> findByProfileId(@PathVariable Long profileId) {
        return ResponseEntity.ok(wishlistService.findByProfileId(profileId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWishlist(@PathVariable Long id) {
        wishlistService.deleteWishlist(id);
        return ResponseEntity.noContent().build();
    }
}
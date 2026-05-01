package com.gamebox.gb.domain.dtos.profile;

import com.gamebox.gb.domain.dtos.favorite.FavoriteSearchResponse;
import com.gamebox.gb.domain.dtos.played.PlayedResponse;
import com.gamebox.gb.domain.dtos.review.ReviewSearchResponse;
import com.gamebox.gb.domain.dtos.wishlist.WishlistSearchResponse;

import java.util.List;

public record ProfileDashboardResponse(
        ProfileResponse profile,
        List<PlayedResponse> playedGames,
        List<FavoriteSearchResponse> favoriteGames,
        List<WishlistSearchResponse> wishlistGames,
        List<ReviewSearchResponse> reviews
) {}

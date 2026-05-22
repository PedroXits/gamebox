package com.gamebox.gb.domain.dtos.profile;

import com.gamebox.gb.domain.dtos.favorite.FavoriteResponse;
import com.gamebox.gb.domain.dtos.played.PlayedResponse;
import com.gamebox.gb.domain.dtos.review.ReviewSearchResponse;
import com.gamebox.gb.domain.dtos.wishlist.WishlistSearchResponse;

import java.util.List;

public record ProfileDashboardResponse(
        ProfileResponse profile,
        List<PlayedResponse> playedGames,
        List<FavoriteResponse> favorites,
        List<WishlistSearchResponse> wishlistGames,
        List<ReviewSearchResponse> reviews
) {}

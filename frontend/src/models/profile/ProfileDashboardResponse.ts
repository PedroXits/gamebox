import { ProfileResponse } from "./ProfileResponse";
import { PlayedResponse } from "@/models/played/PlayedResponse";
import { FavoriteResponse } from "@/models/favorite/FavoriteResponse";
import { WishlistSearchResponse } from "@/models/wishlist/WishlistSearchResponse";
import { ReviewSearchResponse } from "@/models/review/ReviewSearchResponse";

export type ProfileDashboardResponse = {
  profile: ProfileResponse;
  playedGames: PlayedResponse[];
  favorites: FavoriteResponse[];
  wishlistGames: WishlistSearchResponse[];
  reviews: ReviewSearchResponse[];
};
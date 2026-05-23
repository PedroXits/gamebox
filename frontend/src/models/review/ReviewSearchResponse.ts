export type ReviewSearchResponse = {
    reviewId: number;
    gameId: number;
    profileName: string;
    gameName: string;
    gamePhoto: string;
    bannerPhoto: string;
    releaseYear: number;
    isFavorite: boolean;
    rating: number;
    comment: string;
};
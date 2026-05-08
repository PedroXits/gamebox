//guarda favoritos, jogados e wishlist com funções de add/remover e verificar se o jogo existe
import React, { createContext, useContext, useState, } from "react";

type GamesContextType = {
    playedGames: string[];
    favoriteGames: string[];
    wishlistGames: string[];

    togglePlayed: (id:string) => void;
    toggleFavorite: (id:string) => void;
    toggleWishlist: (id:string) => void;
};

const GamesContext = createContext({} as GamesContextType);

export function GamesProvider({ children, }: { children: React.ReactNode }) {
    
    const [playedGames, setPlayedGames] = useState<string[]>([]);
    const [favoriteGames, setFavoriteGames] = useState<string[]>([]);
    const [wishlistGames, setWishlistGames] = useState<string[]>([]);

    function togglePlayed(id: string) {
        if (playedGames.includes(id)) {
            setPlayedGames(
                playedGames.filter((gameId) => gameId !== id)
            );
        } else {
            setPlayedGames([...playedGames, id]);
        }
    }

    function toggleFavorite(id: string) {
        if (favoriteGames.includes(id)) {
            setFavoriteGames(
                favoriteGames.filter((gameId) => gameId !== id)
            );
        } else {
            setFavoriteGames([...favoriteGames, id]);
        }
    }

    function toggleWishlist(id: string) {
        if (wishlistGames.includes(id)) {
            setWishlistGames(
                wishlistGames.filter((gameId) => gameId !== id)
            );
        } else {
            setWishlistGames([...wishlistGames, id]);
        }
    }

    return (
        <GamesContext.Provider
            value={{
                playedGames,
                favoriteGames,
                wishlistGames,

                togglePlayed,
                toggleFavorite,
                toggleWishlist,
            }}
        >
            {children}
        </GamesContext.Provider>
    );
}

export function useGames() {
    return useContext(GamesContext);
}
//armazenar jogos e fornecer funções crud (bd temporário)
import React, { createContext, useContext, useState, ReactNode, } from "react";

export type Game = {
    id: string;
    title: string;
    year: string;
    genres: string;
    image: string;
    description: string;
};

type AdminGamesContextType = {
    games: Game[];
    addGame: (game: Game) => void;
    updateGame: (updatedGame: Game) => void;
    deleteGame: (id: string) => void;
};

const AdminGamesContext = createContext<AdminGamesContextType | undefined>(undefined);

type AdminGamesProviderProps = {
    children: ReactNode;
};

const initialGames: Game[] = [
    {
        id: "tlou",
        title: "The Last of Us Part II Remastered",
        year: "2020",
        genres: "Ação, Survival Horror",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2531310/header.jpg?t=1750959180",
        description: "Um jogo de ação e aventura focado em narrativa, ambientado cinco anos após o original. A história acompanha Ellie em uma jornada brutal de vingança em um Estados Unidos pós-apocalíptico, explorando as consequências emocionais e físicas de seus atos, além de apresentar Abby, uma segunda protagonista jogável.",
    },
    {
        id: "gow",
        title: "God of War",
        year: "2018",
        genres: "Ação, Aventura",
        image: "https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S1_2560x1440-5d74d9b240bba8f2c40920dcde7c5c67_2560x1440-5d74d9b240bba8f2c40920dcde7c5c67",
        description: "Ambientado na mitologia nórdica, o espartano vive como um mortal em Midgard e deve proteger seu filho, Atreus, enquanto enfrentam deuses e monstros nórdicos.",
    },
];

export function AdminGamesProvider({
    children, }: AdminGamesProviderProps) {
        const [games, setGames] = useState<Game[]>(initialGames);

        function addGame(game: Game) {
            setGames((prevGames) => [...prevGames, game]);
        }

        function updateGame(updateGame: Game) {
            setGames((prevGames) => 
                prevGames.map((game) => 
                    game.id === updateGame.id ? updateGame : game)
            );
        }

        function deleteGame(id: string) {
            setGames((prevGames) => 
                prevGames.filter((game) => game.id !== id)
            );
        }

        return (
            <AdminGamesContext.Provider
                value={{
                    games,
                    addGame,
                    updateGame,
                    deleteGame,
                }}
            >
                {children}
            </AdminGamesContext.Provider>
        );
    }

    export function useAdminGames() {
        const context = useContext(AdminGamesContext);

        if (!context) {
            throw new Error(
                "useAdminGames deve ser usado dentro de AdminGamesProvider"
            );
        }

    return context;
}
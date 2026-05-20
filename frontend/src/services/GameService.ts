import { api } from "@/services/api";
import { CreateGameRequest } from "@/models/game/CreateGameRequest";
import { UpdateGameRequest } from "@/models/game/UpdateGameRequest";
import { GameResponse } from "@/models/game/GameResponse";
import { GameSearchResponse } from "@/models/game/GameSearchResponse";

export async function createGame(data: CreateGameRequest): Promise<GameResponse> {
    const response = await api.post("/games", data);
    return response.data;
}

export async function updateGame(gameId:number, data: UpdateGameRequest): Promise<GameResponse> {
    const response = await api.put(`/games/${gameId}`, data);
    return response.data;
}

export async function getGameById(gameId: number): Promise<GameResponse> {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
}

export async function findGameByName(name:string): Promise<GameSearchResponse[]> {
    const response = await api.get(`/games/search`, {params: { name }});
    return response.data;
}

export async function findAllGames(): Promise<GameSearchResponse[]> {
    const response = await api.get("/games");

    return response.data;
}

export async function findRecentGames(): Promise<GameSearchResponse[]> {
    const response = await api.get("/games/recent");
    return response.data;
}

export async function findByGameGenre(genre:string): Promise<GameSearchResponse[]> {
    const response = await api.get(`/games/genre`, {params: { genre }});
    return response.data;
}

export async function deleteGame(gameId: number): Promise<void> {
    await api.delete(`/games/${gameId}`);
}
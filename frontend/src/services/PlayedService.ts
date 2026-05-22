import { api } from "@/services/api";
import { CreatePlayedRequest } from "@/models/played/CreatePlayedRequest";
import { PlayedResponse } from "@/models/played/PlayedResponse";

export async function addToPlayed(data: CreatePlayedRequest): Promise<void> {
  await api.post("/played", data);
}

export async function getPlayedByProfileId(profileId: number): Promise<PlayedResponse[]> {
  const response = await api.get(`/played/profile/${profileId}`);

  return response.data;
}

export async function removeFromPlayed(playedId: number): Promise<void> {
  await api.delete(`/played/${playedId}`);
}
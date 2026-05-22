import { api } from "@/services/api";
import { ProfileResponse } from "@/models/profile/ProfileResponse";
import { UpdateProfileRequest } from "@/models/profile/UpdateProfileRequest";
import { PlayedResponse } from "@/models/played/PlayedResponse";
import { FavoriteResponse } from "@/models/favorite/FavoriteResponse";

export type ProfileDashboardResponse = {
  profile: ProfileResponse;
  played: PlayedResponse[];
  favorites: FavoriteResponse[];
};

export async function getProfileDashboard(profileId: number): Promise<ProfileDashboardResponse> {
  const response = await api.get(`/profiles/${profileId}/dashboard`);

  return response.data;
}

export async function getProfileById(
  profileId: number
): Promise<ProfileResponse> {
  const response = await api.get(`/profiles/${profileId}`);

  return response.data;
}

export async function updateProfile(
  profileId: number,
  data: UpdateProfileRequest
): Promise<ProfileResponse> {
  const response = await api.put(`/profiles/${profileId}`, data);

  return response.data;
}
import { api } from "@/services/api";
import { ProfileResponse } from "@/models/profile/ProfileResponse";

type UpdateProfileRequest = {
  profileName?: string;
  profilePhoto?: string | null;
};

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
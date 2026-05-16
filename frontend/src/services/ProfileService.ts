import { api } from "@/services/api";
import { ProfileResponse } from "@/models/profile/ProfileResponse";

export async function getProfileById(
  profileId: number
): Promise<ProfileResponse> {
  const response = await api.get(`/profile/${profileId}`);

  return response.data;
}
import { api } from "@/services/api";
import { ProfileResponse } from "@/models/profile/ProfileResponse";

export async function getProfileById(
  id: number
): Promise<ProfileResponse> {

  const response = await api.get(
    `/profile/${id}`
  );

  return response.data;
}
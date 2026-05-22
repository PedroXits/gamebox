import { api } from "@/services/api";
import { CreateReviewRequest } from "@/models/review/CreateReviewRequest";
import { UpdateReviewRequest } from "@/models/review/UpdateReviewRequest";
import { ReviewResponse } from "@/models/review/ReviewResponse";
import { ReviewSearchResponse } from "@/models/review/ReviewSearchResponse";

export async function createReview(data: CreateReviewRequest): Promise<ReviewResponse> {
    const response = await api.post("/reviews", data);

    return response.data;
}

export async function updateReview(reviewId:number, data: UpdateReviewRequest): Promise<ReviewResponse> {
    const response = await api.put(`/reviews/${reviewId}`, data);

    return response.data;
}

export async function getReviewsByProfileId(profileId: number): Promise<ReviewSearchResponse[]> {
    const response = await api.get(`/reviews/profile/${profileId}`);

    return response.data;
}

export async function deleteReview(reviewId: number): Promise<void> {
  await api.delete(`/reviews/${reviewId}`);
}
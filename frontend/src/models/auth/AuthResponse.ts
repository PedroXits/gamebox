export interface AuthResponse {
    token: string;
    userId: number;
    email: string;
    username: string;
    profileId: number;
    role: "USER" | "ADMIN";
}
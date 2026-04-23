import type { User } from "@/interfaces/user.interface";

// login Register CheckStatus
export interface AuthResponse {
  user: User;
  token: string;
}

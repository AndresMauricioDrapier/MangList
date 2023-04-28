import { Auth } from "./auth";

export interface AuthResponse {
  user: Auth;
}

export interface AuthResponses {
  users: Auth[];
}

export interface TokenResponse {
  token: string;
  id: string;
}

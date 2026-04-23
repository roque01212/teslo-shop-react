import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  // obtenenmos el token
  const token = localStorage.getItem("token");
  // si no existe no entra directamente
  if (!token) throw new Error("No Token found");

  try {
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");

    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    localStorage.removeItem("token");
    throw new Error("Token expired or not valid");
  }
};

import { api } from "./client";
import {
  TLoginRequest,
  TRegisterRequest,
  TLoginResponse,
  TRegisterResponse,
  TMeResponse,
} from "@/types/api/auth";

// Auth API service
export const authApi = {
  // Login
  login: async (data: TLoginRequest): Promise<TLoginResponse> => {
    const response = await api.post<TLoginResponse>("/auth/login", data);
    return response.data;
  },

  // Register
  register: async (data: TRegisterRequest): Promise<TRegisterResponse> => {
    const response = await api.post<TRegisterResponse>("/auth/register", data);
    return response.data;
  },

  // Logout #TODO

  // Get current user
  getCurrentUser: async (): Promise<TMeResponse> => {
    const response = await api.get<TMeResponse>("/auth/me");
    return response.data;
  },

  // Change password #TODO

  // Forgot password #TODO

  // Reset password #TODO

  // Verify OTP #TODO

  // Send OTP #TODO
};

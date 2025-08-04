import { api } from "./client";
import {
  TLoginRequest,
  TRegisterRequest,
  TAuthResponse,
  TChangePasswordRequest,
  TForgotPasswordRequest,
  TResetPasswordRequest,
  TVerifyOtpRequest,
} from "@/types/api/auth";

// Auth API service
export const authApi = {
  // Login
  login: async (data: TLoginRequest): Promise<TAuthResponse> => {
    const response = await api.post<TAuthResponse>("/auth/login", data);
    return response as unknown as TAuthResponse;
  },

  // Register
  register: async (data: TRegisterRequest): Promise<TAuthResponse> => {
    const response = await api.post<TAuthResponse>("/auth/register", data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response;
  },

  // Change password
  changePassword: async (data: TChangePasswordRequest): Promise<void> => {
    await api.post("/auth/change-password", data);
  },

  // Forgot password
  forgotPassword: async (data: TForgotPasswordRequest): Promise<void> => {
    await api.post("/auth/forgot-password", data);
  },

  // Reset password
  resetPassword: async (data: TResetPasswordRequest): Promise<void> => {
    await api.post("/auth/reset-password", data);
  },

  // Verify OTP
  verifyOtp: async (data: TVerifyOtpRequest): Promise<{ isValid: boolean }> => {
    const response = await api.post<{ isValid: boolean }>(
      "/auth/verify-otp",
      data
    );
    return response.data;
  },

  // Send OTP
  sendOtp: async (phone: string): Promise<void> => {
    await api.post("/auth/send-otp", { phone });
  },
};

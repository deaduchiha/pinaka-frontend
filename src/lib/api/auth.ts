import { api } from "./client";

// Types
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  name?: string;
  phone: string;
  password: string;
  email?: string;
}

export interface AuthResponse {
  user: {
    email?: string;
    id: string;
    name: string;
    phone: string;
    role: "admin" | "manager" | "customer";
  };
  access_token: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface ResetPasswordRequest {
  phone: string;
  otp: string;
  newPassword: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

// Auth API service
export const authApi = {
  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response as unknown as AuthResponse;
  },

  // Register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
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
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await api.post("/auth/change-password", data);
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await api.post("/auth/forgot-password", data);
  },

  // Reset password
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await api.post("/auth/reset-password", data);
  },

  // Verify OTP
  verifyOtp: async (data: VerifyOtpRequest): Promise<{ isValid: boolean }> => {
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

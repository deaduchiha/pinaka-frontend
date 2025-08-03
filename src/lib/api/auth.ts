import { api } from "./client";

// Types
export interface LoginRequest {
  phone: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name?: string;
  phone: string;
  password: string;
  email?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role: "admin" | "manager" | "customer";
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
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
    return response.data;
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

  // Refresh token
  refreshToken: async (
    data: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>(
      "/auth/refresh",
      data
    );
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
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

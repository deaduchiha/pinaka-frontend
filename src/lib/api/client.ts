import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { toast } from "sonner";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem(
      process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "pinaka_auth_token"
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "pinaka_refresh_token"
        );
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/${API_VERSION}/auth/refresh`,
            {
              refreshToken,
            }
          );

          const { accessToken } = response.data;
          localStorage.setItem(
            process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "pinaka_auth_token",
            accessToken
          );

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return apiClient(originalRequest);
        }
      } catch {
        // Refresh failed, redirect to login
        localStorage.removeItem(
          process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "pinaka_auth_token"
        );
        localStorage.removeItem(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "pinaka_refresh_token"
        );
        window.location.href = "/login";
      }
    }

    // Handle other errors
    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "خطایی رخ داده است";

    // Show error toast
    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

// API response wrapper
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

// Generic API methods
export const api = {
  get: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.get(url, config).then((response) => response.data),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.post(url, data, config).then((response) => response.data),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.put(url, data, config).then((response) => response.data),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.patch(url, data, config).then((response) => response.data),

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.delete(url, config).then((response) => response.data),
};

export default apiClient;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi, LoginRequest, RegisterRequest } from "@/lib/api/auth";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "admin" | "manager" | "customer";
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;

  // Setters
  setUser: (user: User | null) => void;
  setTokens: (access_token: string | null) => void;
  setError: (error: string | null) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  access_token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(data);

          const { user, access_token } = response;

          set({
            user,
            access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const axiosError = error as {
            response?: { data?: { message?: string } };
          };
          set({
            isLoading: false,
            error:
              axiosError?.response?.data?.message || "خطا در ورود به سیستم",
          });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          const { user, access_token } = response;

          set({
            user,
            access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const axiosError = error as {
            response?: { data?: { message?: string } };
          };
          set({
            isLoading: false,
            error: axiosError?.response?.data?.message || "خطا در ثبت نام",
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
        } catch {
          // Continue with logout even if API call fails
        } finally {
          set({
            ...initialState,
            isLoading: false,
          });
        }
      },

      getCurrentUser: async () => {
        set({ isLoading: true });
        try {
          const response = (await authApi.getCurrentUser()) as unknown as User;
          set({
            user: response,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          const axiosError = error as {
            response?: { data?: { message?: string } };
          };
          set({
            ...initialState,
            isLoading: false,
            error:
              axiosError?.response?.data?.message ||
              "خطا در دریافت اطلاعات کاربر",
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Setters
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setTokens: (access_token: string | null) => {
        set({
          access_token,
          isAuthenticated: !!access_token,
        });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: "pinaka-auth-storage",
      partialize: (state) => ({
        user: state.user,
        access_token: state.access_token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

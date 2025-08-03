import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi, LoginRequest, RegisterRequest } from '@/lib/api/auth'

interface User {
  id: string
  name: string
  phone: string
  email?: string
  role: 'admin' | 'manager' | 'customer'
  avatar?: string
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshTokenValue: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  // Actions
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
  getCurrentUser: () => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
  
  // Setters
  setUser: (user: User | null) => void
  setTokens: (accessToken: string | null, refreshToken: string | null) => void
  setError: (error: string | null) => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshTokenValue: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions
      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.login(data)
          const { user, accessToken, refreshToken } = response
          
          set({
            user,
            accessToken,
            refreshTokenValue: refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: unknown) {
          const axiosError = error as { response?: { data?: { message?: string } } }
          set({
            isLoading: false,
            error: axiosError?.response?.data?.message || 'خطا در ورود به سیستم',
          })
          throw error
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.register(data)
          const { user, accessToken, refreshToken } = response
          
          set({
            user,
            accessToken,
            refreshTokenValue: refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: unknown) {
          const axiosError = error as { response?: { data?: { message?: string } } }
          set({
            isLoading: false,
            error: axiosError?.response?.data?.message || 'خطا در ثبت نام',
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authApi.logout()
        } catch {
          // Continue with logout even if API call fails
        } finally {
          set({
            ...initialState,
            isLoading: false,
          })
        }
      },

      refreshToken: async () => {
        const { refreshTokenValue } = get()
        if (!refreshTokenValue) {
          throw new Error('No refresh token available')
        }

        try {
          const response = await authApi.refreshToken({ refreshToken: refreshTokenValue })
          const { accessToken, refreshToken: newRefreshToken } = response
          
          set({
            accessToken,
            refreshTokenValue: newRefreshToken,
            isAuthenticated: true,
          })
        } catch (error: unknown) {
          set({
            ...initialState,
            error: 'Token refresh failed',
          })
          throw error
        }
      },

      getCurrentUser: async () => {
        set({ isLoading: true })
        try {
          const response = await authApi.getCurrentUser() as { data: User }
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: unknown) {
          const axiosError = error as { response?: { data?: { message?: string } } }
          set({
            ...initialState,
            isLoading: false,
            error: axiosError?.response?.data?.message || 'خطا در دریافت اطلاعات کاربر',
          })
        }
      },

      clearError: () => {
        set({ error: null })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // Setters
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user })
      },

      setTokens: (accessToken: string | null, refreshToken: string | null) => {
        set({ accessToken, refreshTokenValue: refreshToken, isAuthenticated: !!accessToken })
      },

      setError: (error: string | null) => {
        set({ error })
      },
    }),
    {
      name: 'pinaka-auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshTokenValue: state.refreshTokenValue,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
) 
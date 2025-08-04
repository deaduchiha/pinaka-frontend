"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: unknown) => {
        const axiosError = error as { response?: { status?: number } };
        if (
          axiosError?.response?.status &&
          axiosError.response.status >= 400 &&
          axiosError.response.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
      onError: (error: unknown) => {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };

        const message =
          axiosError?.response?.data?.message ||
          axiosError?.message ||
          "خطایی رخ داده است";
        console.error(message);
      },
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors closeButton duration={4000} />
    </QueryClientProvider>
  );
};

export default Providers;

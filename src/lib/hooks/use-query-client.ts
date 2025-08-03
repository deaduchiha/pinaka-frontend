import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query options
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
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
      // Global mutation options
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
        toast.error(message);
      },
    },
  },
});

// Query invalidation helpers
export const queryKeys = {
  // Auth
  auth: {
    me: ["auth", "me"] as const,
  },

  // Products
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    categories: ["products", "categories"] as const,
  },

  // Orders
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },

  // Customers
  customers: {
    all: ["customers"] as const,
    lists: () => [...queryKeys.customers.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.customers.lists(), filters] as const,
    details: () => [...queryKeys.customers.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.customers.details(), id] as const,
  },

  // Analytics
  analytics: {
    all: ["analytics"] as const,
    sales: ["analytics", "sales"] as const,
    inventory: ["analytics", "inventory"] as const,
    customers: ["analytics", "customers"] as const,
  },
};

// Invalidation helpers
export const invalidateQueries = {
  auth: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.me }),
  products: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all }),
  orders: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.orders.all }),
  customers: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.customers.all }),
  analytics: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.analytics.all }),
};

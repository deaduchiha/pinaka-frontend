import { api } from "./client";
import {
  TOrdersQuery,
  TOrdersResponse,
  TOrder,
  TCreateOrderRequest,
  TUpdateOrderRequest,
  TOrderStats,
} from "@/types/api/orders";

// Orders API service
export const ordersApi = {
  // Get all orders with filters
  getOrders: async (query: TOrdersQuery = {}): Promise<TOrdersResponse> => {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.status) params.append("status", query.status);
    if (query.paymentStatus)
      params.append("paymentStatus", query.paymentStatus);
    if (query.customerId) params.append("customerId", query.customerId);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);

    const response = await api.get<TOrdersResponse>(
      `/orders?${params.toString()}`
    );
    return response.data;
  },

  // Get single order
  getOrder: async (id: string): Promise<TOrder> => {
    const response = await api.get<TOrder>(`/orders/${id}`);
    return response.data;
  },

  // Create order
  createOrder: async (data: TCreateOrderRequest): Promise<TOrder> => {
    const response = await api.post<TOrder>("/orders", data);
    return response.data;
  },

  // Update order
  updateOrder: async (data: TUpdateOrderRequest): Promise<TOrder> => {
    const { id, ...updateData } = data;
    const response = await api.put<TOrder>(`/orders/${id}`, updateData);
    return response.data;
  },

  // Delete order
  deleteOrder: async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
  },

  // Bulk update orders
  bulkUpdateOrders: async (
    ids: string[],
    updates: Partial<TUpdateOrderRequest>
  ): Promise<void> => {
    await api.put("/orders/bulk-update", { ids, updates });
  },

  // Get order statistics
  getOrderStats: async (): Promise<TOrderStats> => {
    const response = await api.get("/orders/stats");
    return response.data as TOrderStats;
  },

  // Export orders
  exportOrders: async (query: TOrdersQuery = {}): Promise<Blob> => {
    const params = new URLSearchParams();

    if (query.status) params.append("status", query.status);
    if (query.paymentStatus)
      params.append("paymentStatus", query.paymentStatus);
    if (query.customerId) params.append("customerId", query.customerId);
    if (query.search) params.append("search", query.search);

    const response = await api.get(`/orders/export?${params.toString()}`, {
      responseType: "blob",
    });
    return response.data as unknown as Blob;
  },
};

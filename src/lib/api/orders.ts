import { api } from "./client";

// Types
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  customerId: string;
  items: Omit<OrderItem, "total">[];
  shippingAddress: Order["shippingAddress"];
  paymentMethod: string;
}

export interface UpdateOrderRequest {
  id: string;
  status?: Order["status"];
  paymentStatus?: Order["paymentStatus"];
  shippingAddress?: Order["shippingAddress"];
}

export interface OrdersQuery {
  page?: number;
  limit?: number;
  status?: Order["status"];
  paymentStatus?: Order["paymentStatus"];
  customerId?: string;
  search?: string;
  sortBy?: "createdAt" | "totalAmount" | "status";
  sortOrder?: "asc" | "desc";
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Orders API service
export const ordersApi = {
  // Get all orders with filters
  getOrders: async (query: OrdersQuery = {}): Promise<OrdersResponse> => {
    const params = new URLSearchParams();
    
    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.status) params.append("status", query.status);
    if (query.paymentStatus) params.append("paymentStatus", query.paymentStatus);
    if (query.customerId) params.append("customerId", query.customerId);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);

    const response = await api.get<OrdersResponse>(`/orders?${params.toString()}`);
    return response.data;
  },

  // Get single order
  getOrder: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  // Create order
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<Order>("/orders", data);
    return response.data;
  },

  // Update order
  updateOrder: async (data: UpdateOrderRequest): Promise<Order> => {
    const { id, ...updateData } = data;
    const response = await api.put<Order>(`/orders/${id}`, updateData);
    return response.data;
  },

  // Delete order
  deleteOrder: async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
  },

  // Bulk update orders
  bulkUpdateOrders: async (ids: string[], updates: Partial<UpdateOrderRequest>): Promise<void> => {
    await api.put("/orders/bulk-update", { ids, updates });
  },

  // Get order statistics
  getOrderStats: async (): Promise<{
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  }> => {
    const response = await api.get("/orders/stats");
    return response.data;
  },

  // Export orders
  exportOrders: async (query: OrdersQuery = {}): Promise<Blob> => {
    const params = new URLSearchParams();
    
    if (query.status) params.append("status", query.status);
    if (query.paymentStatus) params.append("paymentStatus", query.paymentStatus);
    if (query.customerId) params.append("customerId", query.customerId);
    if (query.search) params.append("search", query.search);

    const response = await api.get(`/orders/export?${params.toString()}`, {
      responseType: "blob",
    });
    return response.data;
  },
}; 
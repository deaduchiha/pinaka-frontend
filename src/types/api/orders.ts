// Types
export type TOrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
};

export type TOrder = {
  id: string;
  customerId: string;
  customerName: string;
  items: TOrderItem[];
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
};

export type TCreateOrderRequest = {
  customerId: string;
  items: Omit<TOrderItem, "total">[];
  shippingAddress: TOrder["shippingAddress"];
  paymentMethod: string;
};

export type TUpdateOrderRequest = {
  id: string;
  status?: TOrder["status"];
  paymentStatus?: TOrder["paymentStatus"];
  shippingAddress?: TOrder["shippingAddress"];
};

export type TOrdersQuery = {
  page?: number;
  limit?: number;
  status?: TOrder["status"];
  paymentStatus?: TOrder["paymentStatus"];
  customerId?: string;
  search?: string;
  sortBy?: "createdAt" | "totalAmount" | "status";
  sortOrder?: "asc" | "desc";
};

export type TOrdersResponse = {
  orders: TOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TOrderStats = {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
};

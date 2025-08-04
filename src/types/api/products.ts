// Types
export type TProduct = {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  category: string;
  stockQuantity: number;
  image?: string;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
};

export type TCreateProductRequest = {
  name: string;
  sku: string;
  description?: string;
  price: number;
  category: string;
  stockQuantity: number;
  image?: string;
  status?: "active" | "inactive" | "draft";
};

export type TUpdateProductRequest = Partial<TCreateProductRequest> & {
  id: string;
};

export type TProductsQuery = {
  page?: number;
  limit?: number;
  status?: TProduct["status"];
  category?: string;
  search?: string;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
};

export type TProductsResponse = {
  products: TProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TCategory = {
  id: string;
  name: string;
  description?: string;
  productCount: number;
};

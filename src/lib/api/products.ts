import { api } from "./client";

// Types
export interface Product {
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
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  description?: string;
  price: number;
  category: string;
  stockQuantity: number;
  image?: string;
  status?: "active" | "inactive" | "draft";
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductsQuery {
  page?: number;
  limit?: number;
  status?: Product["status"];
  category?: string;
  search?: string;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  productCount: number;
}

// Products API service
export const productsApi = {
  // Get all products with filters
  getProducts: async (query: ProductsQuery = {}): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.status) params.append("status", query.status);
    if (query.category) params.append("category", query.category);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);

    const response = await api.get<ProductsResponse>(
      `/products?${params.toString()}`
    );

    return response as unknown as ProductsResponse;
  },

  // Get single product
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Create product
  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    const response = await api.post<Product>("/products", data);
    return response.data;
  },

  // Update product
  updateProduct: async (data: UpdateProductRequest): Promise<Product> => {
    const { id, ...updateData } = data;
    const response = await api.put<Product>(`/products/${id}`, updateData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Bulk delete products
  bulkDeleteProducts: async (ids: string[]): Promise<void> => {
    await api.post("/products/bulk-delete", { ids });
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/products/categories");
    return response.data;
  },

  // Create category
  createCategory: async (data: {
    name: string;
    description?: string;
  }): Promise<Category> => {
    const response = await api.post<Category>("/products/categories", data);
    return response.data;
  },

  // Update category
  updateCategory: async (
    id: string,
    data: { name: string; description?: string }
  ): Promise<Category> => {
    const response = await api.put<Category>(
      `/products/categories/${id}`,
      data
    );
    return response.data;
  },

  // Delete category
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/products/categories/${id}`);
  },

  // Upload product image
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post<{ url: string }>(
      "/products/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Import products from CSV/Excel
  importProducts: async (
    file: File
  ): Promise<{ success: boolean; message: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<{ success: boolean; message: string }>(
      "/products/import",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Export products to CSV/Excel
  exportProducts: async (query: ProductsQuery = {}): Promise<Blob> => {
    const params = new URLSearchParams();

    if (query.status) params.append("status", query.status);
    if (query.category) params.append("category", query.category);
    if (query.search) params.append("search", query.search);

    const response = await api.get(`/products/export?${params.toString()}`, {
      responseType: "blob",
    });
    return response.data as Blob;
  },
};

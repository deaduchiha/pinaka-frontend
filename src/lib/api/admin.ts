import { api } from "./client";
import { IProductsQuery, TAdminProductsResponse } from "@/types/api/admin";

export const adminApi = {
  // admin/products
  getProducts: async (
    params: IProductsQuery
  ): Promise<TAdminProductsResponse> => {
    const response = await api.get<TAdminProductsResponse>("/admin/products", {
      params,
    });
    return response.data;
  },
};

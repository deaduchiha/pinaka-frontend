import {
  ProductStatus,
  ProductType,
  TPaginationParams,
  TSortOrder,
  WeightUnit,
} from "./common";

// admin/products | RESPONSE
export type TAdminProductsResponse = {
  products: TProduct[];
  total: number;
};

// product type
type TProduct = {
  id: string;
  name: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  status: ProductStatus;
  type: ProductType;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stockQuantity: number;
  minStockLevel?: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  category?: string;
  categories?: string[];
  tags?: string[];
  images?: string[];
  mainImage?: string;
  variants?: unknown[];
  attributes?: unknown;
  supportsToman: boolean;
  tomanPrice?: number;
  brand?: string;
  model?: string;
  warranty?: string;
  isOriginal: boolean;
  hasWarranty: boolean;
  weight?: number;
  weightUnit: WeightUnit;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  featured: boolean;
  sortOrder: number;
  metadata?: Record<string, unknown>;
  viewCount: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface IProductsQuery extends TPaginationParams {
  status?: ProductStatus;
  type?: ProductType;
  search?: string;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: TSortOrder;
}

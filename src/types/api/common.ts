// auth

export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
  MANAGER = "manager",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  OUT_OF_STOCK = "out_of_stock",
  DISCONTINUED = "discontinued",
}

export enum ProductType {
  PHYSICAL = "physical",
  DIGITAL = "digital",
  SERVICE = "service",
}

export enum WeightUnit {
  GRAM = "gram",
  KILOGRAM = "kilogram",
  POUND = "pound",
}

export type TPaginationParams = {
  page?: number;
  limit?: number;
};

export type TSortOrder = "asc" | "desc";

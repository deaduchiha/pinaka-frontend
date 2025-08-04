# Admin Dashboard Implementation Guide

## Overview

This document outlines the implementation tasks for the admin dashboard frontend, focusing on admin-only routes and functionality. The admin dashboard provides comprehensive management capabilities for the e-commerce platform.

## Current Admin Routes Analysis

### Existing Admin Routes

Based on your actual backend implementation, here are the existing admin routes:

#### 1. Product Management

- `GET /api/v1/admin/products` - List all products with pagination (Admin/Manager)
- `POST /api/v1/admin/products` - Create new product (Admin only)

#### 2. Order Management

- `GET /api/v1/admin/orders` - List all orders with pagination (Admin/Manager)

#### 3. Customer Management

- `GET /api/v1/admin/customers` - List all customers (Admin/Manager)

#### 4. Region Management

- `GET /api/v1/admin/regions` - List all regions (Admin only)

#### 5. System Settings

- `GET /api/v1/admin/settings` - Get system settings (Admin only)

### Missing Routes (Need to be implemented)

#### Product Management

- `PUT /api/v1/admin/products/:id` - Update product
- `DELETE /api/v1/admin/products/:id` - Delete product
- `PATCH /api/v1/admin/products/:id/status` - Update product status

#### Order Management

- `PUT /api/v1/admin/orders/:id` - Update order
- `PATCH /api/v1/admin/orders/:id/status` - Update order status
- `PATCH /api/v1/admin/orders/:id/payment-status` - Update payment status
- `POST /api/v1/admin/orders/:id/tracking` - Add tracking info

#### Customer Management

- `PUT /api/v1/admin/customers/:id` - Update customer
- `DELETE /api/v1/admin/customers/:id` - Delete customer
- `PATCH /api/v1/admin/customers/:id/status` - Update customer status

#### User Management

- `GET /api/v1/admin/users` - List all users (Admin only)
- `POST /api/v1/admin/users` - Create user (Admin only)
- `PUT /api/v1/admin/users/:id` - Update user (Admin only)
- `DELETE /api/v1/admin/users/:id` - Delete user (Admin only)

#### Region Management

- `POST /api/v1/admin/regions` - Create region (Admin only)
- `PUT /api/v1/admin/regions/:id` - Update region (Admin only)
- `DELETE /api/v1/admin/regions/:id` - Delete region (Admin only)

## Implementation Tasks

### Phase 1: Core Admin Dashboard Structure

#### Task 1.1: Admin Layout & Navigation

**Priority:** High
**Type:** Frontend Structure
**Description:** Create the main admin dashboard layout with navigation

**Routes to implement:**

- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/customers` - Customer management
- `/admin/users` - User management
- `/admin/settings` - System settings
- `/admin/regions` - Region management

**Components needed:**

- AdminLayout component
- Sidebar navigation
- Header with user info
- Breadcrumb navigation
- Responsive design for mobile/tablet

#### Task 1.2: Authentication & Authorization

**Priority:** High
**Type:** Security
**Description:** Implement admin authentication and role-based access

**Routes to implement:**

- `/admin/login` - Admin login page
- `/admin/logout` - Admin logout
- Protected route wrapper for admin pages

**Features needed:**

- JWT token management
- Role-based route protection (ADMIN role only)
- Session management
- Auto-logout on token expiry

### Phase 2: Product Management Dashboard

#### Task 2.1: Product List View

**Priority:** High
**Type:** CRUD Operations
**Description:** Display and manage products with advanced filtering

**Routes to implement:**

- `/admin/products` - Product list with pagination
- `/admin/products/create` - Create new product
- `/admin/products/:id` - Product details/edit
- `/admin/products/:id/edit` - Edit product

**Features needed:**

- Product grid/list view toggle
- Advanced filtering (status, category, search)
- Bulk operations (delete, status change)
- Export functionality (CSV, Excel)
- Image upload and management
- SKU validation
- Inventory tracking

#### Task 2.2: Product Creation/Editing

**Priority:** High
**Type:** Form Management
**Description:** Comprehensive product management forms

**Components needed:**

- Product creation form
- Product editing form
- Image upload component
- Category management
- Price and inventory management
- SEO fields (meta title, description)
- Product variants management

#### Task 2.3: Product Analytics

**Priority:** Medium
**Type:** Analytics
**Description:** Product performance metrics

**Features needed:**

- Product view counts
- Sales performance
- Inventory alerts
- Low stock notifications
- Product rating management

### Phase 3: Order Management Dashboard

#### Task 3.1: Order List View

**Priority:** High
**Type:** CRUD Operations
**Description:** Comprehensive order management interface

**Routes to implement:**

- `/admin/orders` - Order list with filtering
- `/admin/orders/:id` - Order details
- `/admin/orders/:id/edit` - Edit order
- `/admin/orders/statistics` - Order analytics

**Features needed:**

- Order status management
- Payment status tracking
- Customer information display
- Order timeline/history
- Bulk order operations
- Order search and filtering
- Export order data

#### Task 3.2: Order Details & Actions

**Priority:** High
**Type:** Business Logic
**Description:** Detailed order management with actions

**Components needed:**

- Order details view
- Status update interface
- Payment status management
- Shipping information management
- Order notes/comments
- Invoice generation
- Tracking number management

#### Task 3.3: Order Analytics

**Priority:** Medium
**Type:** Analytics
**Description:** Order performance metrics

**Features needed:**

- Sales analytics dashboard
- Order status distribution
- Revenue tracking
- Customer order history
- Payment method analytics

### Phase 4: Customer Management Dashboard

#### Task 4.1: Customer List View

**Priority:** Medium
**Type:** CRUD Operations
**Description:** Customer database management

**Routes to implement:**

- `/admin/customers` - Customer list
- `/admin/customers/:id` - Customer details
- `/admin/customers/:id/edit` - Edit customer
- `/admin/customers/analytics` - Customer analytics

**Features needed:**

- Customer search and filtering
- Customer segmentation
- Contact information management
- Order history per customer
- Customer notes/comments
- Export customer data

#### Task 4.2: Customer Details & Actions

**Priority:** Medium
**Type:** Business Logic
**Description:** Detailed customer management

**Components needed:**

- Customer profile view
- Order history display
- Address management
- Communication history
- Customer status management
- Account verification status

### Phase 5: User Management Dashboard

#### Task 5.1: User List View

**Priority:** Medium
**Type:** CRUD Operations
**Description:** Admin user management

**Routes to implement:**

- `/admin/users` - User list (Admin only)
- `/admin/users/create` - Create new user
- `/admin/users/:id` - User details
- `/admin/users/:id/edit` - Edit user

**Features needed:**

- User role management (ADMIN, MANAGER, CUSTOMER)
- User status management
- Account verification status
- User search and filtering
- Bulk user operations

#### Task 5.2: User Creation/Editing

**Priority:** Medium
**Type:** Form Management
**Description:** User management forms

**Components needed:**

- User creation form
- User editing form
- Role assignment interface
- Status management
- Password reset functionality

### Phase 6: System Settings & Configuration

#### Task 6.1: System Settings

**Priority:** Low
**Type:** Configuration
**Description:** System-wide configuration management

**Routes to implement:**

- `/admin/settings` - System settings
- `/admin/settings/general` - General settings
- `/admin/settings/email` - Email configuration
- `/admin/settings/payment` - Payment settings
- `/admin/settings/shipping` - Shipping settings

**Features needed:**

- System information display
- Environment configuration
- Feature flags management
- System limits configuration
- Backup and restore options

#### Task 6.2: Region Management

**Priority:** Low
**Type:** Configuration
**Description:** Regional settings and currency management

**Routes to implement:**

- `/admin/regions` - Region list
- `/admin/regions/create` - Create region
- `/admin/regions/:id` - Region details
- `/admin/regions/:id/edit` - Edit region

**Features needed:**

- Currency management
- Regional settings
- Tax configuration
- Shipping zone management

### Phase 7: Analytics & Reporting

#### Task 7.1: Analytics Integration

**Priority:** Medium
**Type:** Analytics
**Description:** Integrate analytics with existing admin routes

**Routes to implement:**

- `/admin/analytics/sales` - Sales analytics (new endpoint needed)
- `/admin/analytics/products` - Product analytics (new endpoint needed)
- `/admin/analytics/customers` - Customer analytics (new endpoint needed)

**Features needed:**

- Revenue charts and graphs
- Order statistics
- Product performance metrics
- Customer growth analytics
- Real-time data updates
- Export reports

#### Task 7.2: Advanced Reporting

**Priority:** Low
**Type:** Analytics
**Description:** Advanced reporting capabilities

**Features needed:**

- Custom report builder
- Scheduled reports
- Data export functionality
- Performance metrics
- Trend analysis

## Technical Implementation Guidelines

### Frontend Technology Stack

- **Framework:** React/Next.js or Vue.js
- **State Management:** Redux/Zustand or Pinia
- **UI Library:** Material-UI, Ant Design, or Tailwind CSS
- **HTTP Client:** Axios or Fetch API
- **Form Management:** React Hook Form or Formik
- **Charts:** Chart.js, Recharts, or D3.js

### Security Considerations

- Implement role-based access control (RBAC)
- Secure JWT token storage
- API request authentication
- Input validation and sanitization
- XSS protection
- CSRF protection

### Performance Optimization

- Implement lazy loading for routes
- Use pagination for large datasets
- Implement caching strategies
- Optimize API calls
- Use virtual scrolling for large lists

### Responsive Design

- Mobile-first approach
- Tablet-friendly interface
- Desktop optimization
- Touch-friendly interactions
- Adaptive layouts

## API Integration Points

### Authentication Endpoints

- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/logout` - Admin logout
- `GET /api/v1/auth/me` - Get current user info

### Admin Dashboard Endpoints

- `GET /api/v1/admin/products` - Product management (with pagination)
- `POST /api/v1/admin/products` - Create product (Admin only)
- `GET /api/v1/admin/orders` - Order management (with pagination)
- `GET /api/v1/admin/customers` - Customer management
- `GET /api/v1/admin/regions` - Region management
- `GET /api/v1/admin/settings` - System settings

### Additional Required Endpoints

The following endpoints need to be implemented in the backend:

#### Product Management

- `PUT /api/v1/admin/products/:id` - Update product
- `DELETE /api/v1/admin/products/:id` - Delete product
- `PATCH /api/v1/admin/products/:id/status` - Update product status
- `POST /api/v1/admin/products/bulk-delete` - Bulk delete products

#### Order Management

- `PUT /api/v1/admin/orders/:id` - Update order
- `PATCH /api/v1/admin/orders/:id/status` - Update order status
- `PATCH /api/v1/admin/orders/:id/payment-status` - Update payment status
- `POST /api/v1/admin/orders/:id/tracking` - Add tracking info

#### Customer Management

- `PUT /api/v1/admin/customers/:id` - Update customer
- `DELETE /api/v1/admin/customers/:id` - Delete customer
- `PATCH /api/v1/admin/customers/:id/status` - Update customer status

#### User Management

- `POST /api/v1/admin/users` - Create user
- `PUT /api/v1/admin/users/:id` - Update user
- `DELETE /api/v1/admin/users/:id` - Delete user
- `PATCH /api/v1/admin/users/:id/role` - Update user role

#### Analytics Endpoints

- `GET /api/v1/admin/analytics/dashboard` - Dashboard metrics
- `GET /api/v1/admin/analytics/sales` - Sales analytics
- `GET /api/v1/admin/analytics/products` - Product analytics
- `GET /api/v1/admin/analytics/customers` - Customer analytics

## TypeScript Type Definitions

### Authentication Types

```typescript
// Login Request/Response
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}

// User Types
interface UserResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
  MANAGER = "manager",
}

enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}
```

### Product Management Types

```typescript
// Product List Response (matches your actual admin/products endpoint)
interface AdminProductsResponse {
  products: ProductResponseDto[];
  total: number;
}

interface ProductResponseDto {
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
  variants?: any[];
  attributes?: any;
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
  metadata?: any;
  viewCount: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  OUT_OF_STOCK = "out_of_stock",
  DISCONTINUED = "discontinued",
}

enum ProductType {
  PHYSICAL = "physical",
  DIGITAL = "digital",
  SERVICE = "service",
}

enum WeightUnit {
  GRAM = "gram",
  KILOGRAM = "kilogram",
  POUND = "pound",
}

// Product Creation (matches your actual admin/products POST endpoint)
interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  status?: ProductStatus;
  type?: ProductType;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stockQuantity?: number;
  minStockLevel?: number;
  trackInventory?: boolean;
  allowBackorder?: boolean;
  category?: string;
  categories?: string[];
  tags?: string[];
  images?: string[];
  mainImage?: string;
  variants?: any[];
  attributes?: any;
  supportsToman?: boolean;
  tomanPrice?: number;
  brand?: string;
  model?: string;
  warranty?: string;
  isOriginal?: boolean;
  hasWarranty?: boolean;
  weight?: number;
  weightUnit?: WeightUnit;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  featured?: boolean;
  sortOrder?: number;
  metadata?: any;
}
```

### Order Management Types

```typescript
// Order List Response (matches your actual admin/orders endpoint)
interface AdminOrdersResponse {
  orders: OrderResponseDto[];
  total: number;
}

interface OrderResponseDto {
  id: string;
  orderNumber: string;
  customerId: string;
  userId?: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount?: number;
  tomanTotal?: number;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingProvince: string;
  shippingPostalCode: string;
  shippingPhone: string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingCity: string;
  billingProvince: string;
  billingPostalCode: string;
  billingPhone: string;
  items: OrderItemResponseDto[];
  totalItems: number;
  notes?: string;
  internalNotes?: string;
  confirmedAt?: Date;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  refundedAt?: Date;
  transactionId?: string;
  paymentGateway?: string;
  paymentDetails?: any;
  trackingNumber?: string;
  shippingCarrier?: string;
  trackingDetails?: any;
  nationalId?: string;
  economicCode?: string;
  isBusinessOrder: boolean;
  requiresInvoice: boolean;
  invoiceNumber?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItemResponseDto {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
  taxAmount: number;
  attributes?: any;
}

// Order Status and Payment Status (from your actual enums)
type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "partial_refund";

type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partial_refund";

type PaymentMethod = "online" | "cash_on_delivery" | "bank_transfer" | "wallet";

type ShippingMethod = "standard" | "express" | "same_day" | "pickup";

// Order Update Types
interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

interface UpdatePaymentStatusRequest {
  paymentStatus: PaymentStatus;
}

interface AddTrackingRequest {
  trackingNumber: string;
  shippingCarrier: string;
  trackingDetails?: any;
}
```

### Customer Management Types

```typescript
// Customer Response (matches your actual admin/customers endpoint)
interface CustomerResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  status: string;
  nationalId?: string;
  province?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Customer Status (from your actual enum)
type CustomerStatus = "active" | "inactive" | "suspended";

// Customer Update
interface UpdateCustomerRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  status?: CustomerStatus;
  nationalId?: string;
  province?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  metadata?: any;
}
```

### User Management Types

```typescript
// User List Response
interface UserListResponse {
  users: UserResponse[];
  total: number;
}

// User Creation/Update
interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  status?: UserStatus;
  metadata?: Record<string, any>;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  metadata?: Record<string, any>;
}

interface UpdateUserRoleRequest {
  role: UserRole;
}
```

### Region Management Types

```typescript
// Region Response (matches your actual admin/regions endpoint)
interface RegionResponseDto {
  id: string;
  name: string;
  code: string;
  nameEn?: string;
  countryCode: CountryCode;
  type: RegionType;
  parentId?: string;
  currencyCode: CurrencyCode;
  currencyRate: number;
  isActive: boolean;
  supportsToman: boolean;
  shippingZone?: ShippingZone;
  supportedShippingMethods?: string[];
  excludedShippingMethods?: string[];
  latitude?: number;
  longitude?: number;
  population?: number;
  isCapital: boolean;
  isMajorCity: boolean;
  supportsLocalDelivery: boolean;
  requiresSpecialHandling: boolean;
  deliveryRadius?: number;
  taxRates?: {
    vat?: number;
    customs?: number;
    local?: number;
  };
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  slug?: string;
  description?: string;
  sortOrder: number;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Region Enums (from your actual entity)
enum CurrencyCode {
  IRR = "IRR",
  USD = "USD",
  EUR = "EUR",
}

enum CountryCode {
  IR = "IR",
}

enum RegionType {
  COUNTRY = "country",
  PROVINCE = "province",
  CITY = "city",
  DISTRICT = "district",
}

enum ShippingZone {
  TEHRAN = "tehran",
  MAJOR_CITIES = "major_cities",
  OTHER_CITIES = "other_cities",
  REMOTE_AREAS = "remote_areas",
  INTERNATIONAL = "international",
}

// Region Creation/Update
interface CreateRegionRequest {
  name: string;
  code: string;
  nameEn?: string;
  countryCode: CountryCode;
  type: RegionType;
  parentId?: string;
  currencyCode: CurrencyCode;
  currencyRate: number;
  isActive?: boolean;
  supportsToman?: boolean;
  shippingZone?: ShippingZone;
  supportedShippingMethods?: string[];
  excludedShippingMethods?: string[];
  latitude?: number;
  longitude?: number;
  population?: number;
  isCapital?: boolean;
  isMajorCity?: boolean;
  supportsLocalDelivery?: boolean;
  requiresSpecialHandling?: boolean;
  deliveryRadius?: number;
  taxRates?: {
    vat?: number;
    customs?: number;
    local?: number;
  };
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  slug?: string;
  description?: string;
  sortOrder?: number;
  metadata?: any;
}

interface UpdateRegionRequest extends Partial<CreateRegionRequest> {}
```

### System Settings Types

```typescript
// System Settings Response (matches your actual admin/settings endpoint)
interface SystemSettingsResponse {
  system: {
    version: string;
    environment: string;
    uptime: number;
  };
  features: {
    multiCurrency: boolean;
    multiLanguage: boolean;
    inventoryTracking: boolean;
    orderManagement: boolean;
    customerManagement: boolean;
  };
  limits: {
    maxProducts: number;
    maxOrders: number;
    maxCustomers: number;
    maxFileSize: string;
  };
}
```

### Analytics Types

```typescript
// Dashboard Analytics
interface DashboardAnalyticsResponse {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    averageOrderValue: number;
    conversionRate: number;
  };
  recentOrders: OrderResponse[];
  topProducts: ProductAnalyticsResponse[];
  salesChart: SalesChartData[];
  orderStatusDistribution: OrderStatusDistribution[];
  revenueByPeriod: RevenueByPeriod[];
}

interface ProductAnalyticsResponse {
  product: ProductResponse;
  views: number;
  sales: number;
  revenue: number;
  conversionRate: number;
}

interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface OrderStatusDistribution {
  status: OrderStatus;
  count: number;
  percentage: number;
}

interface RevenueByPeriod {
  period: string;
  revenue: number;
  growth: number;
}

// Sales Analytics
interface SalesAnalyticsResponse {
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    growthRate: number;
  };
  breakdown: {
    byDay: SalesChartData[];
    byProduct: ProductAnalyticsResponse[];
    byCategory: CategoryAnalyticsResponse[];
    byPaymentMethod: PaymentMethodAnalyticsResponse[];
  };
}

interface CategoryAnalyticsResponse {
  category: string;
  revenue: number;
  orders: number;
  products: number;
}

interface PaymentMethodAnalyticsResponse {
  method: string;
  revenue: number;
  orders: number;
  percentage: number;
}
```

### API Request/Response Types

```typescript
// Common API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Pagination Types (matches your actual admin endpoints)
interface PaginationParams {
  page?: number;
  limit?: number;
}

// Admin API Response Types (matches your actual endpoints)
interface AdminProductsResponse {
  products: ProductResponseDto[];
  total: number;
}

interface AdminOrdersResponse {
  orders: OrderResponseDto[];
  total: number;
}

interface AdminCustomersResponse {
  customers: CustomerResponseDto[];
}

interface AdminRegionsResponse {
  regions: RegionResponseDto[];
}

interface AdminSettingsResponse {
  system: {
    version: string;
    environment: string;
    uptime: number;
  };
  features: {
    multiCurrency: boolean;
    multiLanguage: boolean;
    inventoryTracking: boolean;
    orderManagement: boolean;
    customerManagement: boolean;
  };
  limits: {
    maxProducts: number;
    maxOrders: number;
    maxCustomers: number;
    maxFileSize: string;
  };
}

// Filter Types for your actual endpoints
interface ProductFilters extends PaginationParams {
  status?: ProductStatus;
  category?: string;
  brand?: string;
  search?: string;
}

interface OrderFilters extends PaginationParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  search?: string;
}

interface CustomerFilters {
  status?: CustomerStatus;
  search?: string;
}

interface RegionFilters {
  countryCode?: CountryCode;
  type?: RegionType;
  isActive?: boolean;
}
```

### Frontend Route Types

```typescript
// React Router Types (if using React Router)
interface AdminRouteParams {
  productId?: string;
  orderId?: string;
  customerId?: string;
  userId?: string;
  regionId?: string;
}

// Navigation Types (based on your actual admin routes)
interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: string;
  children?: NavigationItem[];
  permissions: UserRole[];
}

interface BreadcrumbItem {
  title: string;
  path?: string;
  active: boolean;
}

// Your Actual Admin Routes
interface AdminRoutes {
  products: "/admin/products";
  orders: "/admin/orders";
  customers: "/admin/customers";
  regions: "/admin/regions";
  settings: "/admin/settings";
}

// Form Types
interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "checkbox"
    | "radio"
    | "date"
    | "file";
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: ValidationRule[];
}

interface ValidationRule {
  type: "required" | "email" | "min" | "max" | "pattern";
  value?: any;
  message: string;
}

// Table Types
interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
}

interface TableFilters {
  [key: string]: any;
}

interface TableSort {
  field: string;
  order: "asc" | "desc";
}
```

## Development Timeline

### Week 1-2: Foundation

- Set up project structure
- Implement authentication
- Create admin layout
- Basic routing

### Week 3-4: Product Management

- Product list view
- Product creation/editing
- Image upload functionality

### Week 5-6: Order Management

- Order list view
- Order details and actions
- Status management

### Week 7-8: Customer & User Management

- Customer management interface
- User management interface
- Role-based access

### Week 9-10: Analytics & Settings

- Dashboard analytics
- System settings
- Region management

### Week 11-12: Testing & Polish

- Comprehensive testing
- Performance optimization
- Bug fixes and refinements

## Success Criteria

### Functional Requirements

- All admin routes are accessible and functional
- CRUD operations work correctly
- Role-based access is properly implemented
- Responsive design works on all devices
- Performance meets requirements (< 3s load time)

### Technical Requirements

- Code follows best practices
- Proper error handling
- Comprehensive test coverage
- Security vulnerabilities addressed
- Documentation complete

### User Experience Requirements

- Intuitive navigation
- Fast loading times
- Clear feedback for user actions
- Consistent design language
- Accessibility compliance

## Conclusion

This implementation guide provides a comprehensive roadmap for building the admin dashboard frontend. The phased approach ensures systematic development while maintaining focus on core functionality first. Each phase builds upon the previous one, creating a robust and scalable admin interface.

Remember to:

- Follow security best practices
- Implement proper error handling
- Write comprehensive tests
- Document code thoroughly
- Get regular feedback from stakeholders
- Plan for future scalability

The admin dashboard is a critical component of the e-commerce platform, providing the tools necessary for effective business management and growth.

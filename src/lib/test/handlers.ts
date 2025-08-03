import { http, HttpResponse } from 'msw'

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    phone: '09123456789',
    email: 'admin@pinaka.com',
    role: 'admin' as const,
    avatar: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

const mockProducts = [
  {
    id: '1',
    name: 'Sample Product',
    sku: 'PROD-001',
    description: 'A sample product for testing',
    price: 100000,
    category: 'electronics',
    stockQuantity: 50,
    image: '/images/product-1.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

const mockOrders = [
  {
    id: '1',
    customerId: '1',
    items: [
      {
        productId: '1',
        quantity: 2,
        price: 100000,
      },
    ],
    totalAmount: 200000,
    status: 'pending' as const,
    paymentStatus: 'pending' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// API handlers
export const handlers = [
  // Auth endpoints
  http.post('/api/v1/auth/login', () => {
    return HttpResponse.json({
      data: {
        user: mockUsers[0],
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      },
      message: 'Login successful',
      success: true,
    })
  }),

  http.post('/api/v1/auth/register', () => {
    return HttpResponse.json({
      data: {
        user: mockUsers[0],
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      },
      message: 'Registration successful',
      success: true,
    })
  }),

  http.get('/api/v1/auth/me', () => {
    return HttpResponse.json({
      data: mockUsers[0],
      message: 'User retrieved successfully',
      success: true,
    })
  }),

  // Products endpoints
  http.get('/api/v1/products', () => {
    return HttpResponse.json({
      data: {
        products: mockProducts,
        total: mockProducts.length,
        page: 1,
        limit: 10,
      },
      message: 'Products retrieved successfully',
      success: true,
    })
  }),

  http.get('/api/v1/products/:id', ({ params }) => {
    const product = mockProducts.find(p => p.id === params.id)
    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({
      data: product,
      message: 'Product retrieved successfully',
      success: true,
    })
  }),

  // Orders endpoints
  http.get('/api/v1/orders', () => {
    return HttpResponse.json({
      data: {
        orders: mockOrders,
        total: mockOrders.length,
        page: 1,
        limit: 10,
      },
      message: 'Orders retrieved successfully',
      success: true,
    })
  }),

  http.get('/api/v1/orders/:id', ({ params }) => {
    const order = mockOrders.find(o => o.id === params.id)
    if (!order) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({
      data: order,
      message: 'Order retrieved successfully',
      success: true,
    })
  }),

  // Analytics endpoints
  http.get('/api/v1/analytics/sales', () => {
    return HttpResponse.json({
      data: {
        totalSales: 1000000,
        monthlySales: [
          { month: 'Jan', sales: 100000 },
          { month: 'Feb', sales: 150000 },
          { month: 'Mar', sales: 200000 },
        ],
      },
      message: 'Sales analytics retrieved successfully',
      success: true,
    })
  }),

  http.get('/api/v1/analytics/inventory', () => {
    return HttpResponse.json({
      data: {
        totalProducts: 100,
        lowStockProducts: 5,
        outOfStockProducts: 2,
      },
      message: 'Inventory analytics retrieved successfully',
      success: true,
    })
  }),
] 
# Pinaka E-commerce Frontend

A modern e-commerce platform built with Next.js 15, TypeScript, and shadcn/ui.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS 4
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: JWT-based auth with refresh tokens
- **Testing**: Jest + React Testing Library + MSW
- **Docker Support**: Production-ready Docker configuration
- **Persian Language**: Full RTL support and Persian localization
- **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Package Manager**: Bun
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form + Zod
- **Data Tables**: TanStack Table
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Testing**: Jest + React Testing Library + MSW

### Additional Libraries
- **Icons**: Lucide React
- **Date/Time**: date-fns
- **Validation**: Zod
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Charts**: Recharts
- **File Upload**: UploadThing

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pinaka-frontend
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Run the development server**
   ```bash
   bun run dev
   ```

The application will be available at [http://localhost:3001](http://localhost:3001).

### Docker Development

1. **Build and run with Docker Compose**
   ```bash
   docker-compose --profile dev up --build
   ```

2. **Or build and run manually**
   ```bash
   docker build -f Dockerfile.dev -t pinaka-frontend-dev .
   docker run -p 3001:3001 -v $(pwd):/app pinaka-frontend-dev
   ```

## 🐳 Docker Deployment

### Production Build

1. **Build the production image**
   ```bash
   docker build -t pinaka-frontend .
   ```

2. **Run the production container**
   ```bash
   docker run -p 3001:3001 pinaka-frontend
   ```

### Docker Compose Production

```bash
docker-compose up --build
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

### Test Structure
- **Unit Tests**: `src/**/*.test.{js,jsx,ts,tsx}`
- **Integration Tests**: `tests/**/*.test.{js,jsx,ts,tsx}`
- **Mock Server**: MSW for API mocking

## 📁 Project Structure

```
pinaka-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Dashboard routes
│   │   ├── (shop)/            # Shop routes
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── forms/            # Form components
│   │   ├── tables/           # Data table components
│   │   ├── charts/           # Chart components
│   │   ├── layout/           # Layout components
│   │   └── shared/           # Shared components
│   ├── lib/                  # Utilities and configurations
│   │   ├── api/              # API client and services
│   │   ├── utils/            # Utility functions
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # Zustand stores
│   │   └── test/             # Test utilities
│   ├── types/                # TypeScript type definitions
│   └── config/               # Configuration files
├── tests/                    # Test files
├── public/                   # Static assets
├── Dockerfile                # Production Dockerfile
├── Dockerfile.dev            # Development Dockerfile
├── docker-compose.yml        # Docker Compose configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_VERSION=v1

# Authentication
NEXT_PUBLIC_AUTH_TOKEN_KEY=pinaka_auth_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=pinaka_refresh_token

# Upload Configuration
NEXT_PUBLIC_UPLOADTHING_SECRET=your_uploadthing_secret
NEXT_PUBLIC_UPLOADTHING_APP_ID=your_uploadthing_app_id

# Application Configuration
NEXT_PUBLIC_APP_NAME=Pinaka E-commerce
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_APP_DESCRIPTION=Modern e-commerce platform
```

### API Integration

The application is configured to work with a REST API. Update the API base URL in your environment variables to point to your backend service.

## 🎨 UI Components

The project uses shadcn/ui components with custom styling. All components are located in `src/components/ui/` and follow the shadcn/ui pattern.

### Available Components
- Button
- Input
- Dialog
- Dropdown Menu
- Select
- Table
- Toast
- And more...

## 📊 State Management

### Zustand Stores
- **Auth Store**: User authentication and session management
- **Cart Store**: Shopping cart state and persistence
- **UI Store**: Global UI state (modals, sidebar, etc.)

### TanStack Query
- **Query Client**: Configured with global error handling
- **Query Keys**: Organized query key structure
- **Mutations**: Optimistic updates and error handling

## 🔐 Authentication

The application supports:
- Phone number + password login
- JWT token authentication
- Automatic token refresh
- Role-based access control
- Session persistence

## 🌐 Internationalization

- **Language**: Persian/Farsi
- **Direction**: RTL (Right-to-Left)
- **Currency**: Iranian Rial (IRR)
- **Date Format**: Persian calendar

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
```bash
# Build production image
docker build -t pinaka-frontend .

# Run container
docker run -p 3001:3001 pinaka-frontend
```

### Docker Compose
```bash
docker-compose up --build
```

## 📈 Performance

### Optimizations
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in with Next.js
- **Caching**: TanStack Query caching
- **Lazy Loading**: Component and route lazy loading

### Monitoring
- **Core Web Vitals**: Built-in monitoring
- **Error Tracking**: Global error boundary
- **Performance Metrics**: Custom performance tracking

## 🧪 Testing Strategy

### Test Types
- **Unit Tests**: Individual component and function tests
- **Integration Tests**: API integration and user flows
- **E2E Tests**: Complete user journey tests

### Testing Tools
- **Jest**: Test runner
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **User Event**: User interaction simulation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the task requirements in `FRONTEND-TASK.md`

## 🎯 Roadmap

- [ ] Complete authentication system
- [ ] Product management features
- [ ] Order management system
- [ ] Customer management
- [ ] Analytics dashboard
- [ ] Advanced search and filtering
- [ ] Payment integration
- [ ] Mobile app (React Native)

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui
# pinaka-frontend

# Huusy - Real Estate Marketplace

A modern real estate marketplace built with Next.js 15, TypeScript, Supabase, and Tailwind CSS.

## To do

- [ ] create dashboard layout pro and customer
- [ ] create dashboard page pro and customer
- [ ] add all the business logic for pro and customer to be able to manage property for pro and add property to favorite for customer

## layout header light

this is the light header layout works

```tsx
export default function CustomerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <MainHeader variant='light' />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

## layout header dark

this is the dark header layout works

```tsx
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='dark' className='border-b border-primary-800' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
```

## Authentication System

The application implements a dual authentication system for two types of users:

### Pro Users (Real Estate Agents/Agencies)

- Complete profile with agency details
- Email verification required
- Custom dashboard access
- Property management capabilities

### Customer Users

- Simplified registration process
- Email verification required
- Favorites and search history
- Property viewing and inquiry capabilities

## Technical Implementation

### Supabase Authentication Setup

1. **Client Configuration**

- Browser client for client-side operations
- Server client with SSR support
- Middleware for session management

2. **Database Schema**

```ts
export type AccountPro = {
  id: string;
  full_name: string;
  email: string;
  agency_name: string;
  phone: string;
  profile_image_url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

export type AccountCustomer = {
  id: string;
  username: string;
  email: string;
  profile_image_url?: string;
  account_type: 'customer';
  created_at: string;
  updated_at: string;
};
```

3. **Authentication Flow**

Pro Users:

- Sign Up: Collects agency details and creates both auth and profile records
- Sign In: Validates credentials and retrieves associated pro account details
- Email Verification: Required before accessing pro features

Customer Users:

- Sign Up: Simple form with username, email, and password
- Sign In: Email/password authentication with profile data retrieval
- Email Verification: Required for account activation

4. **Security Features**

- Secure session management
- Email verification
- Password validation
- Protected routes
- Type-safe error handling

### Key Components

1. **Forms**

- Pro Sign Up Form: Agency registration with detailed information
- Pro Sign In Form: Secure authentication for agencies
- Customer Sign Up Form: Simplified registration for property seekers
- Customer Sign In Form: Easy access for regular users

2. **Layouts**

- Auth Layout: Handles authentication pages
- Dashboard Layout: Different layouts for pro and customer users
- Main Layout: Public pages layout

3. **Middleware**

- Session management
- Route protection
- Authentication state handling

## Usage

1. **Environment Setup**

```bash
# Create .env.local file with Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. **Installation**

```bash
npm install
npm run dev
```

3. **Development**

```bash
# Run with Turbopack
npm run dev

# Build for production
npm run build

```

## Supabase Authentication Implementation

### 1. Client Configuration

The codebase implements two types of Supabase clients:

#### Browser Client

This creates a client for client-side operations using `createBrowserClient` from `@supabase/ssr`.

#### Server Client

```ts
// Pro Account Schema
type AccountPro = {
  id: string; // References auth.users.id
  full_name: string;
  email: string;
  agency_name: string; // Agency-specific field
  phone: string;
  profile_image_url?: string; // Optional profile image
  description?: string; // Optional agency description
  created_at?: string;
  updated_at?: string;
};
// Customer Account Schema
type AccountCustomer = {
  id: string; // References auth.users.id
  username: string;
  email: string;
  profile_image_url?: string; // Optional profile image
  account_type: 'customer'; // Type discriminator
  created_at: string;
  updated_at: string;
};
```

### 2. Database Schema

The application uses two main tables for user profiles:

```ts
// Pro Account Schema
type AccountPro = {
  id: string; // References auth.users.id
  full_name: string;
  email: string;
  agency_name: string; // Agency-specific field
  phone: string;
  profile_image_url?: string; // Optional profile image
  description?: string; // Optional agency description
  created_at?: string;
  updated_at?: string;
};

// Customer Account Schema
type AccountCustomer = {
  id: string; // References auth.users.id
  username: string;
  email: string;
  profile_image_url?: string; // Optional profile image
  account_type: 'customer'; // Type discriminator
  created_at: string;
  updated_at: string;
};
```

### 3. Authentication Flow

#### Pro Users

Key features:

- Creates auth user with 'pro' role
- Stores additional agency details
- Handles email verification
- Error handling with TypeScript support

#### Customer Users

Key features:

- Simplified registration process
- Basic profile creation
- Email verification
- Type-safe error handling

### 4. Middleware Implementation

```typescript:src/middleware.ts
startLine: 1
endLine: 20
```

The middleware:

- Updates session on each request
- Handles cookie management
- Skips processing for static files
- Provides error handling

### 5. Security Features

#### Session Management

```typescript:src/utils/supabase/middleware.ts
startLine: 5
endLine: 52
```

Features:

- Secure cookie handling
- Session refresh
- Environment variable validation
- Error boundary

#### Protected Routes

- Route protection based on user role
- Session validation
- Redirect handling for unauthenticated users

### 6. Forms Implementation

#### Pro Sign Up Form

```typescript:src/features/auth/components/SignUpProForm.tsx
startLine: 10
endLine: 127
```

#### Pro Sign In Page

```typescript:src/app/(auth)/pro/sign-in/page.tsx
startLine: 1
endLine: 27
```

#### Customer Forms

Similar implementation with simplified fields and validation.

### 7. Email Verification

Features:

- Separate verification pages for pro and customer users
- Email resend functionality
- User-friendly error messages
- Redirect handling

### 8. Environment Setup

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 9. Type Safety

The implementation uses TypeScript throughout:

- Strong typing for auth functions
- Interface definitions for user profiles
- Type-safe error handling
- Proper type inference for Supabase responses

This setup provides a robust, type-safe authentication system with separate flows for professional and customer accounts, complete with email verification and proper session management.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Huusy is a modern real estate marketplace built with Next.js 15, TypeScript, Supabase, and Tailwind CSS. It features a dual authentication system for professional real estate agents (Pro users) and regular customers.

## Development Commands

```bash
# Development with Turbopack (recommended)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Database**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **UI Components**: Custom components with Headless UI
- **Animation**: Framer Motion

### Project Structure
The codebase follows a feature-based architecture:

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (grouped route)
│   ├── (dashboard)/       # Dashboard pages for pro/customer users
│   ├── (main)/            # Main public pages
│   ├── agents/            # Agent profiles
│   ├── properties/        # Property listings by category/city/type
│   └── search/            # Search functionality
├── features/              # Feature modules (auth, dashboard, filters, etc.)
├── components/            # Shared UI components
├── utils/supabase/        # Supabase client configurations
└── types/                 # TypeScript type definitions
```

### Key Patterns

1. **Dual User System**
   - Pro Users: Real estate agents with agency profiles and property management
   - Customer Users: Property seekers with favorites and search capabilities

2. **Feature Modules**
   - Each feature in `src/features/` contains its own components, hooks, and stores
   - Example: `features/filters/` contains FilterSection, FilterSidebar, hooks, and filterStore

3. **State Management**
   - Zustand stores in feature folders (e.g., `favoritesStore`, `filterStore`, `searchStore`)
   - Server state managed through Supabase queries

4. **Routing**
   - Group routes for organization: `(auth)`, `(dashboard)`, `(main)`
   - Dynamic routes: `[id]`, `[path]` for properties and profiles
   - Protected routes handled via middleware

## Supabase Integration

### Database Tables
- `account_pro`: Professional user profiles
- `account_customer`: Customer profiles  
- `properties`: Property listings
- `property_types`: Property categorization
- `cities`: Location data
- `sale_types`: Rent/Sale categorization
- `favorites`: Customer favorites

### Authentication
- Separate auth flows for Pro and Customer users
- Email verification required
- Session management via middleware
- Two Supabase clients: browser client and server client with SSR

### Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=your_site_url
```

## Component Patterns

### Layout Components
- `MainHeader`: Accepts `variant='light'` or `variant='dark'`
- Different layouts for auth, dashboard, and main sections
- Footer component used across all layouts

### Loading States
- Skeleton components in `components/skeleton/` for all major UI elements
- Example: `PropertyProCardSkeleton`, `CustomerSettingFormSkeleton`

### Form Components
- Separate forms for Pro and Customer authentication
- Form components located in `features/auth/components/`
- Type-safe form handling with TypeScript

## Development Guidelines

### TypeScript
- Strict mode enabled
- Path alias `@/` maps to `./src/`
- Comprehensive type definitions in `src/types/`

### Styling
- Tailwind CSS with custom design tokens
- Custom colors: primary (green shades), neutral grays
- Utility classes merged with `tailwind-merge`
- Global styles in `src/styles/globals.css`

### Performance
- Turbopack enabled for faster development
- Optimized package imports for key libraries
- Image optimization with Next.js Image component
- Lazy loading with dynamic imports

### SEO & Accessibility
- Dynamic sitemap generation at `/sitemap.ts`
- Robots.txt configuration
- Semantic HTML structure
- Meta tags optimization in page layouts

## Common Tasks

### Adding a New Property Feature
1. Create feature module in `src/features/`
2. Add components, hooks, and stores as needed
3. Update relevant pages in `src/app/`
4. Add types to `src/types/`

### Working with Authentication
- Pro auth utilities in `src/utils/supabase/auth.ts`
- Separate sign-up/sign-in flows for Pro and Customer
- Check user type before routing to dashboards

### Managing State
- Create Zustand store in relevant feature folder
- Use typed selectors and actions
- Persist critical state to localStorage if needed

### Database Queries
- Use Supabase client from `src/utils/supabase/`
- Server-side queries in server components
- Client-side queries with proper error handling

## Testing & Quality

### Before Committing
1. Run `npm run lint` to check for linting errors
2. Ensure TypeScript compilation passes
3. Test both Pro and Customer flows
4. Verify responsive design on mobile/desktop

### Known Issues
- TypeScript and ESLint checks are temporarily commented out in `next.config.ts`
- Address these before production deployment
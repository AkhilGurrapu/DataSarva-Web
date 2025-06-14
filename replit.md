# DataAI Consulting - Full-Stack Application

## Overview

This is a modern full-stack web application for DataAI Consulting, a data analytics and AI consulting company. The application features a professional marketing website with blog functionality, contact forms, and resource management. Built with React on the frontend and Express.js on the backend, it demonstrates modern web development practices with TypeScript, modern UI components, and database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Backend**: Supabase (managed PostgreSQL + Edge Functions)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth with built-in user management
- **API Layer**: Supabase Edge Functions for custom business logic
- **Data Access**: Direct database queries with RLS security policies
- **Validation**: Zod schemas for request/response validation
- **Serverless**: Edge Functions deployed on Supabase infrastructure

### Key Design Decisions
- **Monorepo Structure**: Shared types and schemas between client and server
- **Type Safety**: End-to-end TypeScript with shared validation schemas
- **Modern React**: Functional components with hooks, no class components
- **Component Architecture**: Atomic design with reusable UI components
- **Database-First**: Schema-driven development with Drizzle

## Key Components

### Frontend Components
- **Layout Components**: Header, Footer with responsive navigation
- **Page Components**: Home, About, Blog, Resources, Contact pages
- **UI Components**: Complete shadcn/ui component library implementation
- **Form Components**: Contact form with validation and error handling
- **Content Components**: Blog post rendering with markdown support

### Backend Components
- **API Routes**: RESTful endpoints for contact form submission
- **Database Layer**: Drizzle ORM with PostgreSQL integration
- **Storage Interface**: Abstracted storage layer supporting multiple implementations
- **Middleware**: Request logging, error handling, JSON parsing

### Shared Components
- **Schema Definitions**: Drizzle tables and Zod validation schemas
- **Type Definitions**: Shared TypeScript interfaces and types
- **Database Configuration**: Centralized database setup and migrations

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Edge Function Processing**: Supabase Edge Functions handle business logic
3. **Database Operations**: Direct Supabase queries with RLS enforcement
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: React Query manages server state and caching

### Contact Form Flow
1. User fills out contact form with validation
2. Form data validated using Zod schema
3. Supabase Edge Function processes and stores contact request
4. Database stores contact information with RLS security
5. Success/error feedback displayed to user

## External Dependencies

### Database
- **Supabase**: Managed PostgreSQL with built-in authentication and real-time features
- **Row Level Security**: Database-level security policies for data protection
- **Edge Functions**: Serverless functions for custom business logic
- **Connection Pooling**: Built-in connection management and auto-scaling

### UI and Styling
- **Radix UI**: Accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Roboto and Source Code Pro fonts

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Static type checking
- **ESLint/Prettier**: Code quality and formatting
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Development Environment
- **Replit Configuration**: Optimized for Replit development environment
- **Hot Module Replacement**: Vite provides fast development experience
- **Database Setup**: PostgreSQL module for local development
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend Build**: Vite builds optimized static assets
- **Backend Build**: ESBuild bundles server code for production
- **Database Migrations**: Drizzle Kit manages schema changes
- **Environment Configuration**: Production environment variables

### Replit Deployment
- **Autoscale Deployment**: Configured for Replit's autoscale deployment
- **Port Configuration**: Port 5000 mapped to external port 80
- **Module Dependencies**: Node.js 20, Web, and PostgreSQL 16 modules
- **Workflow Automation**: Automated build and start processes

## Changelog

```
Changelog:
- June 14, 2025: Initial setup
- June 14, 2025: Supabase migration completed successfully
  - Migrated from Express.js backend to Supabase infrastructure
  - Deployed Edge Function for secure contact form processing
  - Implemented Row Level Security policies for data protection
  - Updated frontend to use Supabase client library
  - Verified end-to-end functionality with live database
  - Removed Express API dependencies and fallback code
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
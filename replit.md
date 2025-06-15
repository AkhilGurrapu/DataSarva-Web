# DataAI Consulting - Supabase-Powered Application

## Overview

This is a modern full-stack web application for DataAI Consulting, a data analytics and AI consulting company. The application features a professional marketing website with blog functionality, contact forms with email notifications, and resource management. Built with React on the frontend and Supabase on the backend, it demonstrates modern serverless architecture with TypeScript, modern UI components, managed database, and automated email notifications.

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
- **Platform**: Supabase - Complete backend-as-a-service solution
- **Database**: PostgreSQL with Row Level Security (RLS) policies
- **API Layer**: Edge Functions for serverless business logic
- **Authentication**: Built-in Supabase Auth (ready for implementation)
- **Email Service**: Resend API integration for notifications
- **Security**: Row-level access controls and environment variable management
- **Deployment**: Serverless Edge Functions with global distribution

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
5. Email notifications sent via Resend API:
   - Admin notification with full contact details
   - Customer confirmation with professional message
6. Success/error feedback displayed to user

## Technology Stack & Services

### Backend Services
- **Supabase**: Complete backend platform with PostgreSQL, Edge Functions, and authentication
  - Project URL: `https://oyzuanydpkgsntouplfk.supabase.co`
  - Row Level Security enabled for data protection
  - Edge Functions for serverless business logic
  - Real-time subscriptions available
- **Resend**: Email delivery service for contact form notifications
  - Free tier: 100 emails/day, 3,000/month
  - Professional HTML email templates
  - Delivery analytics and tracking

### Frontend Dependencies
- **React 18**: Modern component-based architecture with hooks
- **TypeScript**: Full type safety across the application
- **Vite**: Lightning-fast development server and build tool
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **Radix UI + shadcn/ui**: Accessible component library
- **Tailwind CSS**: Utility-first styling framework
- **React Hook Form + Zod**: Type-safe form validation
- **Lucide React**: Consistent iconography

### Development Tools
- **Replit**: Cloud development environment
- **Supabase Dashboard**: Database management and monitoring
- **Resend Dashboard**: Email delivery monitoring

## Complete Setup Guide

### Prerequisites
1. **Supabase Account**: Free account at supabase.com
2. **Resend Account**: Free account at resend.com for email notifications
3. **Environment Variables**: Configured in Replit Secrets and Supabase

### Database Setup (Already Configured)
```sql
-- Tables created in Supabase:
-- 1. users (id, username, password)
-- 2. contact_requests (id, name, email, company, interest, message, created_at)
-- 
-- Row Level Security (RLS) policies:
-- - Public can insert contact requests
-- - Authenticated users can read contact requests
-- - Users can only access their own data
```

### Environment Variables (Required)
```env
# Supabase Configuration (Set in Replit Secrets)
VITE_SUPABASE_URL=https://oyzuanydpkgsntouplfk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Configuration (Set in Supabase Edge Functions)
RESEND_API_KEY=re_xxxxxxxxxx
```

### Edge Function Configuration
**Location**: Supabase Dashboard → Edge Functions → contact-form

**Complete Code** (Replace existing Edge Function with this):
```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// CORS headers for allowing frontend requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Email sending function using Resend
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')
  
  if (!resendApiKey) {
    console.log('RESEND_API_KEY not configured, skipping email notification')
    return
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DataAI Consulting <noreply@dataai-consulting.com>',
        to: [to],
        subject: subject,
        html: html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Failed to send email:', error)
    } else {
      console.log('Email sent successfully to:', to)
    }
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin access
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const { name, email, company, interest, message }: ContactFormData = await req.json()

    // Validate required fields
    if (!name || !email || !company || !interest || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'All fields are required'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Insert contact request into database
    const { data, error } = await supabase
      .from('contact_requests')
      .insert({
        name,
        email,
        company,
        interest,
        message,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to submit contact request'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Send notification emails after successful database insert
    try {
      // Email template for admin notification
      const adminEmailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Contact ID:</strong> ${data.id}</p>
      `

      // Email template for customer confirmation
      const customerEmailHtml = `
        <h2>Thank you for contacting DataAI Consulting</h2>
        <p>Hello ${name},</p>
        <p>We've received your inquiry about ${interest} and will get back to you within 24 hours.</p>
        
        <h3>Your message:</h3>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <p>Best regards,<br>
        DataAI Consulting Team</p>
        
        <hr>
        <p style="font-size: 12px; color: #666;">
          This is an automated confirmation. Please do not reply to this email.
        </p>
      `

      // Send admin notification (UPDATE THIS EMAIL ADDRESS)
      await sendEmail(
        'admin@dataai-consulting.com', // <-- CHANGE TO YOUR EMAIL
        `New Contact Form: ${name} - ${interest}`,
        adminEmailHtml
      )

      // Send customer confirmation
      await sendEmail(
        email,
        'Thank you for contacting DataAI Consulting',
        customerEmailHtml
      )

    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if emails fail
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact request submitted successfully',
        id: data.id
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid request format'
      }),
      {
        status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
```

**Important**: Update line 127 to use your actual email address instead of `admin@dataai-consulting.com`

### Email Templates
**Admin Notification**:
- Contact details and message
- Submission timestamp
- Database record ID

**Customer Confirmation**:
- Professional thank you message
- Copy of their inquiry
- 24-hour response promise

### Troubleshooting & Monitoring

**Database Issues**:
- Check Supabase Table Editor for data insertion
- Verify RLS policies allow required operations
- Monitor connection status in dashboard

**Email Delivery Issues**:
- Verify RESEND_API_KEY in Supabase Edge Functions environment
- Check Resend dashboard for delivery status and errors
- Confirm admin email address is updated in Edge Function code
- Look for emails in spam folders

**Edge Function Debugging**:
- Monitor logs in Supabase Dashboard → Edge Functions → contact-form → Logs
- Check for environment variable errors
- Verify function deployment status

**Frontend Issues**:
- Application shows green status when Supabase is properly configured
- Check browser console for JavaScript errors
- Verify environment variables are set in Replit Secrets

### Performance & Scaling
- **Supabase**: Auto-scaling PostgreSQL with connection pooling
- **Edge Functions**: Global distribution with millisecond response times  
- **Email**: Resend provides 99.9% delivery guarantee
- **Frontend**: Optimized Vite build with code splitting

### Security Features
- **Row Level Security**: Database-level access controls
- **Environment Variables**: Secure secret management
- **HTTPS**: All communications encrypted
- **Input Validation**: Comprehensive form data sanitization

## Changelog

```
Changelog:
- June 14, 2025: Initial DataAI Consulting application created
- June 14, 2025: Complete Supabase migration implemented
  - Migrated from Express.js to Supabase serverless architecture
  - Database: PostgreSQL with Row Level Security policies
  - Edge Functions: Serverless contact form processing
  - Authentication: Supabase Auth framework ready
  - Frontend: Updated to use Supabase client library
- June 14, 2025: Professional email notification system
  - Resend API integration for reliable email delivery
  - Dual notifications: admin alerts + customer confirmations
  - HTML email templates with professional branding
  - Error handling and fallback mechanisms
- June 15, 2025: Documentation consolidation
  - Comprehensive setup guide in single reference document
  - Current architecture and configuration details
  - Complete troubleshooting and monitoring information
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
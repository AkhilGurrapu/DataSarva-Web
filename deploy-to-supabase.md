# Deploy to Supabase - Quick Setup

## Step 1: Run Database Migration

Go to your Supabase dashboard → SQL Editor and run this migration:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create contact_requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  interest TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public contact form submissions" ON contact_requests;
DROP POLICY IF EXISTS "Allow authenticated users to read contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create policies for contact_requests
-- Allow anyone to insert contact requests (for the contact form)
CREATE POLICY "Allow public contact form submissions" ON contact_requests
  FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users to read contact requests (for admin purposes)
CREATE POLICY "Allow authenticated users to read contact requests" ON contact_requests
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create policies for users
-- Only allow users to read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT 
  USING (auth.uid()::text = id::text);

-- Allow users to update own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE 
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);
```

## Step 2: Deploy Edge Function

### Option A: Using Supabase Dashboard (Recommended)

1. Go to Edge Functions in your Supabase dashboard
2. Click "New Function"
3. Name it `contact-form`
4. Replace the template code with:

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers for allowing frontend requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

5. Click "Deploy"

### Option B: Using CLI (Advanced)

If you have the Supabase CLI installed:

```bash
supabase functions deploy contact-form
```

## Step 3: Test the Setup

After completing both steps, your contact form will automatically switch to using Supabase. You can verify by:

1. Submitting a test contact form
2. Checking the `contact_requests` table in your Supabase dashboard
3. Looking for any error messages in the Edge Function logs

## Verification

Your application will show a green status indicator when Supabase is properly configured and ready to use.
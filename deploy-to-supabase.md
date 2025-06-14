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

## Step 2: Deploy Edge Function with Email Notifications

### Option A: Using Supabase Dashboard (Recommended)

1. Go to Edge Functions in your Supabase dashboard
2. Click "New Function"
3. Name it `contact-form`
4. Replace the template code with (includes email notifications):

Copy the complete code from `supabase/functions/contact-form/index.ts` in your project files.

5. Click "Deploy"

## Step 3: Configure Email Notifications

1. Sign up for a free account at [resend.com](https://resend.com)
2. Get your API key from the Resend dashboard
3. In your Supabase project, go to **Settings** → **Edge Functions**
4. Add environment variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
5. Update the admin email address in the Edge Function code (line 149)
6. Redeploy the function

### Option B: Using CLI (Advanced)

If you have the Supabase CLI installed:

```bash
supabase functions deploy contact-form
```

## Step 4: Test the Complete Setup

After completing all steps, test the full functionality:

1. Submit a test contact form
2. Check the `contact_requests` table in your Supabase dashboard for the new entry
3. Verify email notifications:
   - Check your admin email for the notification
   - Check the test email address for the confirmation
   - Look in spam folders if emails don't appear immediately
4. Monitor Edge Function logs for any errors

## Verification

Your application shows a green status indicator confirming the migration is complete. With email notifications enabled, you'll receive immediate alerts for new contact requests while customers get professional confirmation messages.
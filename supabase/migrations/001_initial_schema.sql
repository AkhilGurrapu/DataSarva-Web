-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create contact_requests table
CREATE TABLE contact_requests (
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

-- Allow users to update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE 
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);
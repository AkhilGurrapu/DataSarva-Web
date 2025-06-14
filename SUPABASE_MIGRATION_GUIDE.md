# Supabase Migration Guide for DataAI Consulting

This guide will help you migrate your existing Express.js backend to Supabase, replacing your current PostgreSQL database and API endpoints with Supabase's managed infrastructure.

## Step 1: Create Your Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project" and provide:
   - **Organization**: Create or select your organization
   - **Project Name**: `dataai-consulting`
   - **Database Password**: Use a strong password (save this securely)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Start with the free tier, upgrade as needed

3. Wait for the project to be created (this takes 2-3 minutes)

## Step 2: Get Your API Keys

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy these values and save them securely:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGciOi...`)
   - **Service Role Key** (starts with `eyJhbGciOi...`) - Keep this secret!

## Step 3: Set Up Environment Variables

1. Create a `.env` file in your project root with these values:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace the placeholder values with your actual Supabase credentials.

## Step 4: Run Database Migration

The migration SQL file has already been created at `supabase/migrations/001_initial_schema.sql`. To apply it:

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste it into the SQL Editor and click **Run**

This will create:
- `users` table for user authentication
- `contact_requests` table for contact form submissions
- Row Level Security (RLS) policies for data protection

## Step 5: Deploy the Edge Function

The contact form Edge Function has been created at `supabase/functions/contact-form/index.ts`. To deploy it:

1. Install the Supabase CLI on your local machine:
   ```bash
   npm install -g supabase
   ```

2. Initialize Supabase in your project:
   ```bash
   supabase init
   ```

3. Link to your project (get project ref from your dashboard URL):
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Deploy the Edge Function:
   ```bash
   supabase functions deploy contact-form
   ```

## Step 6: Configure Authentication (Optional)

If you want user authentication:

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Enable **Email** provider
3. Configure any social providers you want (Google, GitHub, etc.)
4. Set up email templates under **Authentication** → **Email Templates**

## Step 7: Test the Migration

1. Start your application: `npm run dev`
2. Try submitting the contact form
3. Check your Supabase dashboard under **Table Editor** → **contact_requests** to see if data is being saved

## Step 8: Remove Old Backend Code (After Testing)

Once everything is working with Supabase:

1. You can remove the Express.js server files:
   - `server/index.ts`
   - `server/routes.ts` 
   - `server/storage.ts`
   - `server/vite.ts`

2. Remove the database-related dependencies from `package.json`:
   - `@neondatabase/serverless`
   - `drizzle-orm`
   - `drizzle-kit`
   - `express`
   - `express-session`

3. Update your build scripts to only build the frontend

## Security Considerations

### Row Level Security (RLS)
- All tables have RLS enabled by default
- Only authenticated users can read contact requests
- Public users can submit contact forms
- Users can only access their own profile data

### API Keys
- **Anon Key**: Safe to use in frontend code, has limited permissions
- **Service Role Key**: Full database access, never expose in frontend code
- Use environment variables for all keys

## Monitoring and Maintenance

### Database Monitoring
- Monitor usage in **Settings** → **Usage**
- Set up alerts for high usage
- Enable daily backups in **Settings** → **Database**

### Function Logs
- View Edge Function logs in **Edge Functions** → **contact-form** → **Logs**
- Monitor for errors and performance issues

### Performance Optimization
- Add database indexes for frequently queried columns
- Use Supabase's built-in caching features
- Monitor query performance in the dashboard

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your domain is added to the allowed origins in Supabase settings
2. **Authentication Errors**: Check that your environment variables are correctly set
3. **Database Errors**: Verify RLS policies allow the operations you're trying to perform
4. **Function Errors**: Check the Edge Function logs for detailed error messages

### Getting Help

- Supabase Documentation: [docs.supabase.com](https://docs.supabase.com)
- Community Support: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
- Discord Community: [discord.supabase.com](https://discord.supabase.com)

## Migration Checklist

- [ ] Created Supabase project
- [ ] Copied API keys to environment variables
- [ ] Ran database migration in SQL Editor
- [ ] Deployed Edge Function (contact-form)
- [ ] Tested contact form submission
- [ ] Verified data appears in Supabase dashboard
- [ ] Configured authentication (if needed)
- [ ] Set up monitoring and backups
- [ ] Removed old backend code (after testing)

## Next Steps

After successful migration:

1. **Scale Your Database**: Upgrade to Pro plan when you need more resources
2. **Add More Features**: Implement user authentication, file uploads, real-time subscriptions
3. **Optimize Performance**: Add database indexes, implement caching strategies
4. **Enhanced Security**: Configure additional RLS policies, set up audit logs

Your application will now have a scalable, managed backend with built-in authentication, real-time capabilities, and automatic backups through Supabase.
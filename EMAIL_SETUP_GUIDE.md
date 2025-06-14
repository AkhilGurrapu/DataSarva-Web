# Email Notifications Setup with Resend

I've integrated email notifications for your contact form using Resend, a free and reliable email service. Here's what you need to do:

## Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. After logging in, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Name it "DataAI Contact Form"
4. Select **Full access** (or **Sending access** if available)
5. Copy the API key (starts with `re_`)

## Step 3: Add the API Key to Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Edge Functions**
3. In the **Environment Variables** section, add:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (paste the key you copied)
4. Click **Save**

## Step 4: Configure Your Domain (Optional but Recommended)

### For Production Use:
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `dataai-consulting.com`)
4. Follow the DNS setup instructions
5. Once verified, update the Edge Function code to use your domain

### For Testing (Free Tier):
Resend allows sending from a default domain for testing. The current setup will work immediately.

## Step 5: Update Admin Email Address

In the Edge Function code, I've set the admin email to `admin@dataai-consulting.com`. You should update this to your actual email address:

1. Go to Supabase dashboard → **Edge Functions** → **contact-form**
2. Find line 149: `'admin@dataai-consulting.com'`
3. Replace with your actual email address
4. Click **Deploy** to save changes

## What Happens Now

When someone submits the contact form:

1. **Admin Email**: You'll receive a detailed notification with:
   - Contact person's details
   - Their message
   - Area of interest
   - Submission timestamp

2. **Customer Email**: They'll receive a professional confirmation with:
   - Thank you message
   - Copy of their inquiry
   - Promise to respond within 24 hours

## Testing the Setup

1. Submit a test contact form on your website
2. Check your email (including spam folder)
3. Verify both admin notification and customer confirmation arrive
4. Check Supabase Edge Function logs for any errors

## Resend Free Tier Limits

- **100 emails per day**
- **3,000 emails per month**
- **1 custom domain**
- **Basic analytics**

This is perfect for most contact forms. Upgrade if you need higher limits.

## Troubleshooting

If emails aren't being sent:

1. Check Supabase Edge Function logs for errors
2. Verify your Resend API key is correctly set
3. Ensure your domain is verified (if using custom domain)
4. Check Resend dashboard for delivery status

## Email Templates

The emails include professional HTML formatting with:
- Clean, branded design
- Contact details clearly displayed
- Automatic confirmation messages
- Responsive layout for mobile devices

Your contact form now provides a complete professional experience with instant email notifications!
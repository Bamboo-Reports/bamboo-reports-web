# Bamboo Reports - Setup Guide

This guide will help you set up user authentication and purchase tracking for Bamboo Reports using Supabase.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)
- Netlify account for deployment

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in the project details:
   - **Name**: bamboo-reports (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase project, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from this repository
4. Paste it into the SQL Editor
5. Click "Run" to execute the SQL
6. You should see a success message. This creates:
   - `products` table with your 3 offerings
   - `purchases` table to track customer purchases
   - `user_profiles` table for user information
   - Row Level Security policies
   - Automatic triggers for user profile creation

## Step 3: Get Your Supabase Credentials

1. In your Supabase project, go to **Project Settings** (gear icon) > **API**
2. You'll need these values:
   - **Project URL**: Copy the URL (starts with `https://`)
   - **anon/public key**: Copy the `anon` key (this is safe to expose in your frontend)
   - **service_role key**: Copy the `service_role` key (⚠️ KEEP THIS SECRET! Never commit to git or expose to client)

## Step 4: Configure Environment Variables

### For Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. Also add your other credentials (Razorpay, Resend, etc.)

### For Netlify Deployment

1. Go to your Netlify site settings
2. Navigate to **Site settings** > **Environment variables**
3. Add the following variables:
   - `VITE_SUPABASE_URL`: Your project URL
   - `VITE_SUPABASE_ANON_KEY`: Your anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key ⚠️
   - All other existing variables (Razorpay, Resend, etc.)
4. Click "Save"
5. Trigger a new deploy for changes to take effect

## Step 5: Enable Email Authentication in Supabase

1. Go to **Authentication** > **Providers** in your Supabase dashboard
2. Make sure **Email** is enabled (it should be by default)
3. Configure email templates if desired:
   - Go to **Authentication** > **Email Templates**
   - Customize confirmation and password reset emails

### Optional: Configure Email Provider

By default, Supabase uses their email service (limited to 3 emails/hour in free tier).

For production, you can configure a custom SMTP provider:
1. Go to **Project Settings** > **Authentication**
2. Scroll to **SMTP Settings**
3. Configure your email provider (Gmail, SendGrid, etc.)

## Step 6: Test the Implementation

### Test User Registration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/signup`
3. Create a test account
4. Check your email for confirmation (if email auth is enabled)
5. Sign in with your credentials

### Test Profile & Purchases

1. While signed in, click your user icon in the header
2. Click "Profile" - you should see your user information
3. Click "My Purchases" - should show empty state (no purchases yet)

### Test Payment Integration

1. Set `VITE_SUBSCRIPTION_ENABLED=true` in your `.env.local`
2. Go to `/pricing`
3. While signed in, click "Get Started" on any plan
4. Complete a test payment using Razorpay test mode
5. After successful payment, check "My Purchases" - you should see your purchase!

### Verify Database Records

1. Go to Supabase **Table Editor**
2. Check these tables:
   - `user_profiles`: Should have your user profile
   - `products`: Should have 3 products (Base, Custom, Consult)
   - `purchases`: Should have your test purchase (if payment completed)

## Architecture Overview

### Authentication Flow

```
User Signs Up → Supabase Auth → Auto-create Profile → Email Confirmation
User Signs In → Supabase Auth → JWT Token → Access Protected Routes
```

### Purchase Flow

```
User Initiates Payment → Razorpay Checkout → Payment Success
  ↓
Verify Payment Signature → Send Confirmation Email
  ↓
Save Purchase to Supabase → Link to User & Product
  ↓
User Can View Purchase in "My Purchases"
```

### Key Components

- **AuthContext** (`src/contexts/AuthContext.tsx`): Manages user authentication state
- **ProtectedRoute** (`src/components/ProtectedRoute.tsx`): Guards authenticated routes
- **save-purchase** (`netlify/functions/save-purchase.js`): Saves purchases to database
- **Supabase RLS**: Ensures users can only see their own data

## Security Notes

⚠️ **IMPORTANT**: Never expose your `SUPABASE_SERVICE_ROLE_KEY` in client-side code!

- The service role key is only used in Netlify Functions (server-side)
- The anon key is safe to use in your React app (client-side)
- Row Level Security (RLS) protects user data even with the anon key
- Users can only read/write their own data (enforced by RLS policies)

## Troubleshooting

### "Supabase credentials are missing" warning

Make sure you've set both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your environment variables.

### Sign up works but no email confirmation

- Check Supabase email settings in **Authentication** > **Providers**
- In development, you can disable email confirmation in Supabase settings
- Check spam folder for confirmation emails

### Purchases not showing up

- Check browser console for errors
- Verify the purchase was saved in Supabase **Table Editor** > `purchases`
- Make sure you're signed in when making the purchase
- Check that RLS policies are properly set up

### Database errors

- Verify all tables were created: run `supabase-schema.sql` again
- Check RLS policies are enabled
- Ensure service role key is set correctly in Netlify environment variables

## Support

For issues or questions, please check:
- Supabase documentation: https://supabase.com/docs
- Netlify documentation: https://docs.netlify.com

## Next Steps

Now that authentication is set up, you can:
- Customize the user profile page
- Add more user fields to the profile
- Implement password reset functionality
- Add OAuth providers (Google, GitHub, etc.)
- Create admin dashboard to manage users and purchases
- Add email notifications for purchases
- Implement subscription renewals

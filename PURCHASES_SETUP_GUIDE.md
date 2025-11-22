# Purchases Feature Setup Guide

## Overview

The purchases functionality has been successfully implemented! Users can now:
- View their purchase history by clicking "My Purchases" in the profile menu
- See all details about their purchases including plan features
- Track Base Layer and Custom Layer purchases

## What Was Implemented

### 1. Database Schema
- Created a `purchases` table in Supabase to store purchase records
- Includes fields: user_id, order_id, plan_name, amount, currency, features, status, payment_method, etc.
- Row Level Security (RLS) enabled so users can only view their own purchases

### 2. User Interface
- **Purchases Page** (`/purchases`): Beautiful page displaying all user purchases with:
  - Plan name and status badge
  - Purchase date and order ID
  - Total amount paid
  - All features included in the plan
  - Payment details (payment ID, method)
  - Empty state with link to pricing page when no purchases exist
- **Profile Menu**: Added "My Purchases" menu item in both desktop and mobile menus
- **Protected Route**: Purchases page requires authentication

### 3. Payment Integration
- Updated payment verification flow to automatically record purchases
- Captures plan features during checkout
- Stores payment method and all transaction details
- Links purchases to authenticated users

## Setup Instructions

### Step 1: Set Up Database

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to the SQL Editor
3. Open `PURCHASES_SCHEMA.md` in this repository
4. Copy and paste the SQL commands from that file
5. Execute the script to create the `purchases` table and policies

### Step 2: Configure Environment Variables

Add the following to your `.env` file:

```env
# Supabase Service Role Key (required for serverless functions)
# Get this from: Supabase Dashboard > Project Settings > API > service_role key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**Important**: The service role key is different from the publishable key (anon key). It has elevated permissions and should NEVER be exposed to the client. It's only used in the serverless functions.

### Step 3: Deploy to Netlify

Make sure your environment variables are set in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add the `SUPABASE_SERVICE_ROLE_KEY` variable
4. Redeploy your site

### Step 4: Test the Feature

1. **Sign in** to your account
2. **Make a test purchase** (use Razorpay test mode):
   - Go to /pricing
   - Select Base Layer or Custom Layer
   - Complete the payment flow
3. **View your purchase**:
   - Click on your profile avatar in the header
   - Click "My Purchases"
   - You should see your purchase with all details

## File Changes

### New Files
- `src/pages/Purchases.tsx` - Main purchases display page
- `PURCHASES_SCHEMA.md` - Database schema and setup instructions
- `PURCHASES_SETUP_GUIDE.md` - This file

### Modified Files
- `src/components/Header.tsx` - Added "My Purchases" menu item
- `src/App.tsx` - Added protected route for purchases page
- `src/lib/razorpay.ts` - Updated to pass userId and features
- `src/pages/Pricing.tsx` - Updated to send purchase data
- `netlify/functions/verify-payment.js` - Updated to record purchases in database
- `.env.example` - Added SUPABASE_SERVICE_ROLE_KEY

## Features Included

### Base Layer Features (displayed in purchases)
- Standard Trends Report - Comprehensive GCC market insights
- L1 List - 2,500+ GCCs - Limited view of GCC database
- Annual Snapshot 2024-25 - Free update in December
- Historic View (3 Years) - GCC movement trends in India
- Quarterly View - Latest quarter insights

### Custom Layer Features (displayed in purchases)
- Everything from Base Layer - All base features included
- Trends Report (Up to 3 Filters) - Customizable filtering options
- Standard L2 - Up to 250 Accounts - Detailed account information
- Standard Prospects Database - Up to 1,200 Verified Prospects
- 35+ Customization Possibilities - Multiple filter combinations

## Security Notes

- ✅ Row Level Security (RLS) enabled on purchases table
- ✅ Users can only view their own purchases
- ✅ Service role key only used in serverless functions (never exposed to client)
- ✅ Purchases route is protected and requires authentication
- ✅ Payment verification happens server-side

## Troubleshooting

### Purchases not showing up
1. Check that the purchases table was created in Supabase
2. Verify SUPABASE_SERVICE_ROLE_KEY is set in Netlify
3. Check the serverless function logs in Netlify for any errors
4. Ensure the user is logged in when making the purchase

### Database insert errors
1. Verify the purchases table schema matches PURCHASES_SCHEMA.md
2. Check that RLS policies are created correctly
3. Ensure service role key has the correct permissions

### Empty purchases page for existing payments
- The purchases feature only records NEW purchases made after this implementation
- Old purchases made before this update won't appear in the purchases page
- You may need to manually add historical purchases to the database if needed

## Next Steps

1. Set up the database schema in Supabase
2. Add the service role key to your environment variables
3. Deploy to Netlify
4. Test with a real purchase
5. Monitor the serverless function logs for any issues

## Support

If you encounter any issues:
1. Check the browser console for client-side errors
2. Check Netlify function logs for server-side errors
3. Verify all environment variables are set correctly
4. Ensure the database schema is created properly

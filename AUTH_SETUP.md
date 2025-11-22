# Authentication Setup Guide

This application now includes a complete authentication system powered by Supabase. Follow this guide to set it up.

## Features

- **Sign Up** - New user registration with email and password
- **Sign In** - Secure authentication for returning users
- **Profile Page** - View user details and manage account
- **Protected Routes** - Automatic redirect to sign-in for unauthorized access
- **Auth-Aware Navigation** - Dynamic header showing Sign In/Sign Up or user profile based on auth state
- **Sign Out** - Secure logout functionality
- **Modern UI** - Clean, responsive design using shadcn/ui components

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details:
   - Name your project
   - Set a strong database password
   - Choose a region close to your users
4. Wait for your project to be created (takes about 2 minutes)

### 2. Get Your Supabase Credentials

1. Once your project is ready, go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the left menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Publishable Key** (starts with `sb_publishable_...`)

**Note:** You may also see an "anon" key (JWT format starting with `eyJ...`) - this is the legacy format. Use the Publishable Key instead as it's the modern standard. Both work identically but Publishable Keys are recommended.

### 3. Configure Environment Variables

1. Open your `.env` file in the project root
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://kgilrj5xunb4ux5woohlug.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_kGILRj5xuNh4UX5WoOHLUg_fhd-lyE4
```

**Important:** Despite the variable name being `VITE_SUPABASE_ANON_KEY`, you should use your Publishable Key here. The variable name is kept for compatibility, but it accepts both the new Publishable Key format and the legacy anon key format.

3. Save the file

### 4. Configure Supabase Authentication

By default, Supabase requires email confirmation. For development, you can disable this:

1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Under **Email Auth**, find "Confirm email"
3. Toggle it OFF for easier development
4. **Important:** Re-enable this in production for security

### 5. Run the Application

```bash
npm run dev
```

Your app will now have full authentication functionality!

## Available Routes

- `/signup` - User registration page
- `/signin` - User login page
- `/profile` - User profile page (protected route)

## How It Works

### Authentication Context

The app uses React Context (`AuthContext`) to manage authentication state globally:

```typescript
const { user, session, loading, signUp, signIn, signOut } = useAuth();
```

### Protected Routes

Routes wrapped with `<ProtectedRoute>` will redirect to `/signin` if the user is not authenticated:

```tsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
```

### Auth-Aware Navigation

The header component automatically shows different options based on authentication state:
- **Not authenticated:** "Sign In" and "Sign Up" buttons
- **Authenticated:** User avatar dropdown with "Profile" and "Sign Out" options

## User Data Structure

When a user signs up, the following data is stored:

- **Email** - User's email address
- **Password** - Securely hashed by Supabase
- **Full Name** - Stored in user metadata
- **Created At** - Timestamp of account creation

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure session management
- Automatic token refresh
- Protected routes prevent unauthorized access
- Email verification (when enabled)

## Customization

### Adding OAuth Providers

To add Google, GitHub, or other OAuth providers:

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable your desired provider
3. Follow Supabase's provider-specific setup guide
4. Add OAuth buttons to your SignIn/SignUp pages

### Password Requirements

Currently set to minimum 6 characters. To change:

1. Edit `src/pages/SignUp.tsx`
2. Modify the validation in the `handleSubmit` function
3. Update the error message accordingly

### Profile Customization

To add more fields to user profiles:

1. Update the sign-up form in `src/pages/SignUp.tsx`
2. Pass additional data in the `options.data` object
3. Access the data via `user.user_metadata` in the Profile page

## Troubleshooting

### "Missing Supabase environment variables" error

- Make sure your `.env` file exists and contains the correct variables
- Restart your development server after adding environment variables

### Email confirmation not working

- Check your Supabase email settings
- For development, disable email confirmation
- Check spam folder for confirmation emails

### Users not persisting after page refresh

- Check browser console for errors
- Verify Supabase credentials are correct
- Ensure the AuthProvider wraps your entire app

## Production Deployment

Before deploying to production:

1. **Enable email confirmation** in Supabase Auth settings
2. **Set up a custom email template** for better branding
3. **Configure allowed redirect URLs** in Supabase
4. **Add your production domain** to Supabase's allowed URLs
5. **Set up Row Level Security (RLS)** policies if using Supabase database

## Support

For more information:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React Auth Tutorial](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

# Supabase Setup Instructions

## Quick Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Get your credentials** from the Supabase dashboard:

   - Go to Settings → API
   - Copy the Project URL and anon public key

3. **Update the `.env` file** in the frontend directory:

   ```bash
   # Replace with your actual Supabase credentials
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Enable Authentication** in Supabase dashboard:

   - Go to Authentication → Settings
   - Enable Email authentication
   - Optionally enable OAuth providers (Google, GitHub)

5. **Test the setup**:
   ```bash
   npm run dev
   ```

## What's Already Configured

✅ **Dependencies installed**: @supabase/supabase-js  
✅ **Supabase client**: `src/lib/supabase.ts`  
✅ **Auth context**: `src/contexts/AuthContext.tsx`  
✅ **Protected routes**: `src/components/ProtectedRoute.tsx`  
✅ **Custom signin page**: Beautiful gradient background with auth integration  
✅ **App integration**: Protected dashboard route redirects to `/signin`  
✅ **Environment setup**: `.env` file created

## Current Behavior

- **Landing page** (`/`) - Public access
- **Signin page** (`/signin`) - Custom signin form connected to Supabase
- **Dashboard** (`/dashboard`) - Protected by Supabase auth
- **Auth flow** - Automatic session management and redirects

## Authentication Features

✅ **Sign In**: Email/password authentication  
✅ **Sign Up**: Partner registration with metadata  
✅ **Demo Login**: One-click demo access  
✅ **Auto Redirect**: Authenticated users redirect to dashboard  
✅ **Loading States**: Smooth UX during auth operations  
✅ **Error Handling**: User-friendly error messages  
✅ **Session Persistence**: Stay logged in across browser sessions

## Next Steps

1. Replace placeholder credentials in `.env`
2. Test authentication flow
3. Customize the auth UI if needed
4. Set up database tables with RLS (Row Level Security)

#

# Testing the Auth Flow

### 1. Test Demo Login

- Go to `/signin`
- Click "Try Demo Account"
- Should redirect to dashboard if demo user exists in Supabase

### 2. Test Sign Up

- Go to `/signin`
- Click "Sign up for partnership"
- Fill out the form
- Submit - should show email verification message

### 3. Test Sign In

- Use registered email/password
- Should redirect to dashboard on success

### 4. Test Protected Routes

- Try accessing `/dashboard` without auth
- Should show Supabase auth UI
- After login, should access dashboard

### 5. Test Session Persistence

- Sign in and refresh page
- Should stay authenticated
- Close browser and reopen - should still be authenticated

## Demo User Setup

**Required**: Create a demo user manually in Supabase dashboard:

1. **Go to Supabase Dashboard** → Authentication → Users
2. **Click "Add user"**
3. **Fill in details**:
   - Email: `demo@gmail.com`
   - Password: `verifiedcc`
   - ✅ **Check "Email Confirm"** (to skip email verification)
4. **Click "Create user"**

**Important**: The demo user must be created manually because automatic signup requires email verification.

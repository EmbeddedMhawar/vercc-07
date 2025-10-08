# Supabase Auth Setup Guide

## Prerequisites
- Supabase project created
- React + Vite frontend setup
- FastAPI backend (optional for auth)

## Step 1: Install Dependencies

```bash
cd frontend
npm install @supabase/supabase-js @supabase/auth-ui-react
```

## Step 2: Environment Variables

### Create `.env` file in frontend root
```bash
# frontend/.env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Update `.gitignore`
```bash
# Add to frontend/.gitignore
.env
.env.local
.env.production
```

## Step 3: Supabase Client Setup

### Create `src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 4: Auth Context (Optional but Recommended)

### Create `src/contexts/AuthContext.tsx`
```typescript
import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

## Step 5: Auth Components

### Create `src/components/Auth.tsx`
```typescript
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'

export function AuthComponent() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google', 'github']}
      redirectTo={window.location.origin}
    />
  )
}
```

### Create `src/components/ProtectedRoute.tsx`
```typescript
import { useAuth } from '../contexts/AuthContext'
import { AuthComponent } from './Auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!session) return <AuthComponent />
  
  return <>{children}</>
}
```

## Step 6: Update Main App

### Update `src/main.tsx`
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
```

### Update `src/App.tsx`
```typescript
import { useAuth } from './contexts/AuthContext'
import { AuthComponent } from './components/Auth'
import { supabase } from './lib/supabase'

function App() {
  const { session } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (!session) {
    return <AuthComponent />
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      {/* Your app content */}
    </div>
  )
}

export default App
```

## Step 7: Supabase Dashboard Configuration

### Enable Authentication
1. Go to Supabase Dashboard → Authentication
2. Enable email authentication
3. Configure OAuth providers (optional):
   - Google: Add client ID/secret
   - GitHub: Add client ID/secret

### Set up Row Level Security (RLS)
```sql
-- Enable RLS on your tables
ALTER TABLE your_table_name ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can view own data" ON your_table_name
FOR SELECT USING (auth.uid() = user_id);
```

## Step 8: Deployment Environment Variables

### For Cloudflare Pages
Set in dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### For other platforms
Add environment variables in your deployment platform's settings.

## Step 9: Testing

### Test locally
```bash
npm run dev
```

### Test features
- [ ] Sign up with email
- [ ] Sign in with email
- [ ] Sign out
- [ ] OAuth providers (if configured)
- [ ] Protected routes
- [ ] Session persistence

## Optional: FastAPI Integration

### If you need server-side validation
```python
# requirements.txt
supabase==1.0.4

# main.py
from supabase import create_client
import os

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")  # Service key, not anon key
supabase = create_client(supabase_url, supabase_key)

def verify_token(token: str):
    try:
        user = supabase.auth.get_user(token)
        return user
    except:
        return None
```

## Security Checklist

- [ ] `.env` files in `.gitignore`
- [ ] Using anon key in frontend (not service key)
- [ ] RLS enabled on database tables
- [ ] Proper policies configured
- [ ] HTTPS in production
- [ ] Environment variables set in deployment

## Troubleshooting

### Common Issues
1. **CORS errors**: Check Supabase URL configuration
2. **Auth not persisting**: Verify session handling
3. **RLS blocking queries**: Check database policies
4. **Environment variables not loading**: Ensure `VITE_` prefix

### Debug Commands
```typescript
// Check current session
console.log(await supabase.auth.getSession())

// Check user
console.log(await supabase.auth.getUser())
```
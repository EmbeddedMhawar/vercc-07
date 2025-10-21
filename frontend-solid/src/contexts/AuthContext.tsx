import { createContext, useContext, createSignal, createEffect, onCleanup, JSXElement } from 'solid-js'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  session: () => Session | null
  loading: () => boolean
}

const AuthContext = createContext<AuthContextType>({
  session: () => null,
  loading: () => true
})

export function AuthProvider(props: { children: JSXElement }) {
  const [session, setSession] = createSignal<Session | null>(null)
  const [loading, setLoading] = createSignal(true)

  createEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setLoading(false)
      }
    )

    // Cleanup subscription on component unmount
    onCleanup(() => subscription.unsubscribe())
  })

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
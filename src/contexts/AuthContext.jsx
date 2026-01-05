import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    // Sprawdź czy jest zapisany tryb gościa
    const guestMode = localStorage.getItem('financeflow-guest-mode')
    if (guestMode === 'true') {
      setIsGuest(true)
      setUser({ id: 'guest', email: 'guest@demo.local', user_metadata: { name: 'Gość' } })
      setLoading(false)
      return
    }

    // Sprawdź aktualną sesję Supabase
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Nasłuchuj zmian w autoryzacji
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsGuest(false)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Rejestracja
  const signUp = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name }
      }
    })
    return { data, error }
  }

  // Logowanie
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  // Kontynuuj jako gość
  const continueAsGuest = () => {
    localStorage.setItem('financeflow-guest-mode', 'true')
    setIsGuest(true)
    setUser({ id: 'guest', email: 'guest@demo.local', user_metadata: { name: 'Gość' } })
  }

  // Wylogowanie
  const signOut = async () => {
    if (isGuest) {
      localStorage.removeItem('financeflow-guest-mode')
      setIsGuest(false)
      setUser(null)
      return { error: null }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // Reset hasła
  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }

  const value = {
    user,
    loading,
    isGuest,
    signUp,
    signIn,
    signOut,
    resetPassword,
    continueAsGuest
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

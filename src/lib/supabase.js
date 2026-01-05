import { createClient } from '@supabase/supabase-js'

// Te wartości trzeba zamienić na swoje z Supabase Dashboard
// Wejdź na: https://supabase.com/dashboard -> Twój projekt -> Settings -> API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js';
import { Database } from './db-types';
import { jwtDecode } from 'jwt-decode'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export function getSupabaseUser(){
  return  supabase.auth.getUser()
}
export  type SupabaseUserResponse = Awaited<ReturnType<typeof getSupabaseUser>>
export  type SupabaseUser = SupabaseUserResponse["data"]["user"]
export type TypedSupabaseClient = typeof supabase

// npx supabase gen types --lang=typescript --project-id 'rkbhyhctrcs' --schema public > src/lib/supabase/db-types.ts

    // @ts-expect-error 
const { subscription: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    const jwt = jwtDecode(session.access_token)
    // @ts-expect-error
    const userRole = jwt?.user_role
    console.log("================== user role ==============",userRole)
  }
})





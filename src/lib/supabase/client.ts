import { createClient } from "@supabase/supabase-js";
import { Database } from "./db-types";
import { jwtDecode } from "jwt-decode";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export function getSupabaseUser() {
  return supabase.auth.getUser();
}
export async function getSupabaseViewer() {
  const session_response = await supabase.auth.getSession();
  const session = session_response.data.session;
  if (session_response.error || !session) {
    return {
      data: null,
      error: session_response.error || new Error("no session"),
    };
  }
  const jwt = jwtDecode(session.access_token);
  // @ts-expect-error
  const userRole = jwt?.user_role as "admin" | "moderator" | null;
  const user_id = session.user.id;
  const user_response = await supabase.from("users").select("*").eq(
    "id",
    user_id,
  ).single();
  4;
  const user = user_response.data;
  if (user_response.error || !user) {
    return { data: null, error: user_response.error || new Error("no user") };
  }
  return { data: { ...user, user_role: userRole }, error: null };
}
export type SupabaseVieweresponse = Awaited<
  ReturnType<typeof getSupabaseViewer>
>;
export type SupabaseUserResponse = Awaited<ReturnType<typeof getSupabaseUser>>;
export type SupabaseUser = SupabaseUserResponse["data"]["user"];
export type TypedSupabaseClient = typeof supabase;
export interface SupabaseViewerResponse {
  data: SupabaseUser;
  error: Error | null;
}

// npx supabase gen types --lang=typescript --project-id 'rkbhyhctrcs' --schema public > src/lib/supabase/db-types.ts

// const { subscription: authListener } = supabase.auth.onAuthStateChange(
//   async (event, session) => {
//     if (session) {
//       const jwt = jwtDecode(session.access_token);
//       // @ts-expect-error
//       const userRole = jwt?.user_role;
//       console.log("================== user role ==============", userRole);
//     }
//   },
// );

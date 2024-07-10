import { createClient } from '@supabase/supabase-js';
import { Database } from './db-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase

// npx supabase gen types --lang=typescript --project-id "rkbhyhctbdyypucjercs --schema public > src/lib/supabase/db-types.ts


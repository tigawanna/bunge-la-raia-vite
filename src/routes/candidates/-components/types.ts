import { Database } from "@/lib/supabase/db-types";

export type CandidateType = Database["public"]["Tables"]["candidates"]["Row"];

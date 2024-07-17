import { Database } from "@/lib/supabase/db-types";

export type CandidateRowType = Database["public"]["Tables"]["candidates"]["Row"];
export type CandidateInsertType = Database["public"]["Tables"]["candidates"]["Insert"];

import { Database } from "@/lib/supabase/db-types";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";

// export type CandidateAspirationRowType = Database["public"]["Tables"]["candidate_aspirations"]["Row"];
// export type CandidateAspirationInsertType = Database["public"]["Tables"]["candidate_aspirations"]["Insert"];
export type CandidateAspirationRowType = {
  candidate_id: string | null;
  created_at: string;
  embedding: string | null;
  gps: unknown | null;
  id: string;
  mission_statement: string;
  period: string;
  vibe_check: VibeCheckType|null;
  vying_for: Database["public"]["Enums"]["positions"];
  vying_in?: string | null;
};
export type CandidateAspirationInsertType = {
  candidate_id: string | null;
  created_at?: string;
  embedding?: string | null;
  gps?: unknown | null;
  id?: string;
  mission_statement: string;
  period: string;
  vying_for: Database["public"]["Enums"]["positions"];
  vying_in?: string | null;
  vibe_check: VibeCheckType|null;
};

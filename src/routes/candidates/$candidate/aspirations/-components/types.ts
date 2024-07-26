import { Database } from "@/lib/supabase/db-types";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";

// export type CandidateAspirationRowType = Database["public"]["Tables"]["candidate_aspirations"]["Row"];
// export type CandidateAspirationInsertType = Database["public"]["Tables"]["candidate_aspirations"]["Insert"];
export type CandidateAspirationRowType = {
  candidate_id: string | null;
  constituency_id: number | null;
  county_id: number | null;
  created_at: string;
  embedding: string | null;
  gps: unknown | null;
  id: string;
  mission_statement: string;
  period: string;
  vibe_check: VibeCheckType;
  vying_for: Database["public"]["Enums"]["positions"];
  ward_id: number | null;
};
export type CandidateAspirationInsertType = {
  candidate_id?: string | null;
  constituency_id?: number | null;
  county_id?: number | null;
  created_at?: string;
  embedding?: string | null;
  gps?: unknown | null;
  id?: string;
  mission_statement: string;
  period: string;
  // vibe_check?: Json | null;
  vying_for: Database["public"]["Enums"]["positions"];
  ward_id?: number | null;
  vibe_check: VibeCheckType;
};

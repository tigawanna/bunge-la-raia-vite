import { Database } from "@/lib/supabase/db-types";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";

// export type CandidateRowType = Database["public"]["Tables"]["candidates"]["Row"];
// export type CandidateInsertType = Database["public"]["Tables"]["candidates"]["Insert"];

export type CandidateRowType = {
    account_id: string;
    avatar_url: string | null;
    banner_url: string | null;
    bio: string | null;
    candidate_summary: string | null;
    created_at: string;
    embedding: string | null;
    id: string;
    last_proompted_on: string | null;
    name: string;
    updated_at: string | null;
    vibe_check?: VibeCheckType
}

export type CandidateInsertType = {
    account_id?: string;
    avatar_url?: string | null;
    banner_url?: string | null;
    bio?: string | null;
    candidate_summary?: string | null;
    created_at?: string;
    embedding?: string | null;
    id?: string;
    last_proompted_on?: string | null;
    name: string;
    updated_at?: string | null;
    vibe_check?:VibeCheckType
}

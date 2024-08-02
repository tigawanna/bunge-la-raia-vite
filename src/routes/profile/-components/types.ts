import { VibeCheckType } from "@/lib/supabase/extra-db-types";

// export type UserProfileRowType = Database["public"]["Tables"]["users"]["Row"];
// export type UserProfileInsertType = Database["public"]["Tables"]["users"]["Insert"];
export type UserProfileRowType = {
    avatar_url: string | null;
    bio: string | null;
    created_at: string;
    email: string | null;
    embedding: string | null;
    fullname: string | null;
    gps: unknown | null;
    id: string;
    last_proompted_on: string | null;
    username: string | null;
    vibe_check: VibeCheckType | null;
}

    export type UserProfileInsertType = {
    avatar_url?: string | null;
    bio?: string | null;
    created_at?: string;
    email?: string | null;
    embedding?: string | null;
    fullname?: string | null;
    gps?: unknown | null;
    id?: string;
    last_proompted_on?: string | null;
    username?: string | null;
    vibe_check: VibeCheckType | null;
    }

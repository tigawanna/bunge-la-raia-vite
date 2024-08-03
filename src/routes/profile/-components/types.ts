import { GeographyPointType, VibeCheckType } from "@/lib/supabase/extra-db-types";

// import { Database } from "@/lib/supabase/db-types";
// export type UserProfileRowTypee = Database["public"]["Tables"]["users"]["Row"];
// export type UserProfileInsertTypee = Database["public"]["Tables"]["users"]["Insert"];


export type UserProfileRowType = {
    avatar_url: string | null;
    banner_url: string | null;
    bio: string | null;
    created_at: string;
    email: string | null;
    embedding: string | null;
    fullname: string | null;
    gps?: GeographyPointType | null;
    id: string;
    last_proompted_on: string | null;
    username: string | null;
    vibe_check: VibeCheckType | null;
}

    export type UserProfileInsertType = {
    avatar_url: string | null;
    banner_url: string | null;
    bio: string | null;
    fullname: string | null;
    gps?: GeographyPointType | null;
    username: string | null;
    vibe_check: VibeCheckType | null;
    }

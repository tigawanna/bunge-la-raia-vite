import { Database } from "./db-types";

export type VibeCheckType= {
    query: string;
    answer: string;
    options?: {
        value: string;
        key: string;
    }[] | undefined;
}[]

export type AspirationsRowType = Database["public"]["Tables"]["candidate_aspirations"];

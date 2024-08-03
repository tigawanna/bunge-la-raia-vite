// import { Database } from "./db-types";
// export type AspirationsRowType = Database["public"]["Tables"]["candidate_aspirations"];

export type VibeCheckType= {
    query: string;
    answer: string;
    options?: {
        value: string;
        key: string;
    }[] | undefined;
}[]


export type GeographyPointType = `POINT(${number} ${number})`

//   location: 'POINT(-73.946823 40.807416)',
// ✅ const location: GeographyPointType = "POINT(-73.946823 40.807416)" 
// ❌ const location2: GeographyPointType = "POINT(-73.94682340.807416)"
// ❌ const location3: GeographyPointType = "POINT(-73.94 abc)"

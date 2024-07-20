export type VibeCheckType= {
    query: string;
    answer: string;
    options?: {
        value: string;
        key: string;
    }[] | undefined;
}[]

import { z } from "zod";

export const vibeCheckSchema = z.array(
    z.object({
        query: z.string(),
        answer: z.string(),
        options: z
            .array(
                z.object({
                    value: z.string(),
                    key: z.string(),
                }),
            )
            .optional(),
    }),
);

export type VibeCheckType = z.infer<typeof vibeCheckSchema>;

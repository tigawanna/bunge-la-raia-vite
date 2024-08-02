import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
const searchparams = z.object({
  is_fresh: z.boolean().optional(),
  form_step: z.number().default(0),
});
export const Route = createFileRoute("/profile/update")({
  component: UpdateUserProfilepage,
  validateSearch: (search) => searchparams.parse(search),
});

export function UpdateUserProfilepage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      UpdateUserProfilepage
    </div>
  );
}

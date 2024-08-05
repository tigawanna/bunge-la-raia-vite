import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";
import { UpdateCandidateForm } from "../-components/candidates/form/UpdateCandidateForm";
import { authGuard } from "@/lib/tanstack/query/use-viewer";
const searchparams = z.object({
  basics: z.boolean().optional(),
  is_fresh: z.boolean().optional(),
  form_step: z.number().default(0),
});
export const Route = createFileRoute("/candidates/$candidate/update")({
  component: UpdateCandidate,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(ctx) {
    await authGuard({ ctx });
  },
});

export function UpdateCandidate() {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Suspense fallback={<CardsListSuspenseFallback cardClassName="w-[40%]" cards={2} />}>
        <UpdateCandidateForm    />
      </Suspense>
    </div>
  );
}

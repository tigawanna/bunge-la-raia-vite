import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { z } from "zod";
import { UpdateAspirations } from "../../../-components/aspirations/form/UpdateAspirations";

const searchparams = z.object({
  basics: z.boolean().optional(),
  is_fresh: z.boolean().optional(),
  form_step: z.number().default(0),
});
export const Route = createFileRoute("/candidates/$candidate/aspirations/$aspiration/update")({
  component: UpdateAspirationPage,
  validateSearch: (search) => searchparams.parse(search),
});

export function UpdateAspirationPage() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-2">
      <Suspense fallback={<CardsListSuspenseFallback cardClassName="w-[40%]" cards={2} />}>
        <UpdateAspirations />
      </Suspense>
    </div>
  );
}

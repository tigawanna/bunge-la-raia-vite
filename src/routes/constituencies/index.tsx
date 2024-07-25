import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
const searchparams = z.object({
  cstsq: z.string().optional(),
});
export const Route = createFileRoute("/constituencies/")({
  component: ConstituenciesPage,
  validateSearch: (search) => searchparams.parse(search),

});

interface ConstituenciesPageProps {}

export function ConstituenciesPage({}: ConstituenciesPageProps) {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center ">
      <ConstituenciesPage />
    </div>
  );
}

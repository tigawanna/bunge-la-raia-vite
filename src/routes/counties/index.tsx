import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Counties } from "./-components/list/Counties";
const searchparams = z.object({
  countysq: z.string().optional(),
});
export const Route = createFileRoute("/counties/")({
  component: CountiesPage,
  validateSearch: (search) => searchparams.parse(search),
});

interface CountiesPageProps {}

export function CountiesPage({}: CountiesPageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center ">
      <Counties />
    </div>
  );
}

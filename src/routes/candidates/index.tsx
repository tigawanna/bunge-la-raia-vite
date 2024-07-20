import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Candidates } from "./-components/list/Candidates";
import { candidatesQueryOptions } from "./-components/query";


const searchparams = z.object({
  sq: z.string().optional(),
  
});
export const Route = createFileRoute("/candidates/")({
  component: CandidatesPage,
  validateSearch: (search) => searchparams.parse(search),
  async loader({context}) {
    return context.queryClient.ensureQueryData(candidatesQueryOptions)
  },
});

interface CandidatesPageProps {
}

export function CandidatesPage({}: CandidatesPageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center">
      <Candidates />
    </div>
  );
}

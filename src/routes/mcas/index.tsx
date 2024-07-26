import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { MCAs } from './-components/list/MCAs';
import { listMCAsQueryOptions } from './-components/list/mcas-query-options';
const searchparams = z.object({
  mcasq: z.string().optional(),
});
export const Route = createFileRoute("/mcas/")({
  component: MCAsPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(listMCAsQueryOptions({ search_query: "" }));
  },
});



export function MCAsPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center '>
  <MCAs/>
 </div>
);
}

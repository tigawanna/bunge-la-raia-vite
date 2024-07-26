import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { MPs } from './-components/list/MPs';
import { listMPsQueryOptions } from './-components/list/mps-query-options';

const searchparams = z.object({
  mpsq: z.string().optional(),
});
export const Route = createFileRoute("/mps/")({
  component: MPPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(listMPsQueryOptions({ search_query: "" }));
  },
});



export function MPPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center '>
  <MPs/>
 </div>
);
}

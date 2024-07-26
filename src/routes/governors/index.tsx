import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { Governors } from './-components/list/Governors';
import { listGovernorsQueryOptions } from './-components/list/governors-query-options';

const searchparams = z.object({
  govsq: z.string().optional(),
});

export const Route = createFileRoute("/governors/")({
  component: GovernorsPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(listGovernorsQueryOptions({ search_query: "" }));
  },
});



export function GovernorsPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center '>
  <Governors/>
 </div>
);
}

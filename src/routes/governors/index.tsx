import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { Governors } from './-components/list/Governors';

const searchparams = z.object({
  govsq: z.string().optional(),
});

export const Route = createFileRoute('/governors/')({
  component: GovernorsPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
})



export function GovernorsPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center '>
  <Governors/>
 </div>
);
}

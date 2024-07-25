import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { MCAs } from './-components/list/MCAs';
const searchparams = z.object({
  mcasq: z.string().optional(),
});
export const Route = createFileRoute('/mcas/')({
  component: MCAsPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
})



export function MCAsPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center '>
  <MCAs/>
 </div>
);
}

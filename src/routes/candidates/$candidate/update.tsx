import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
const searchparams = z.object({
  is_fresh: z.boolean().optional(),
  form_step: z.number().default(0),
});
export const Route = createFileRoute("/candidates/$candidate/update")({
  component: UpdateCandidate,
  validateSearch: (search) => searchparams.parse(search),
});



export function UpdateCandidate(){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
  <h1 className='text-xl'>Update Candidate</h1>
 </div>
);
}

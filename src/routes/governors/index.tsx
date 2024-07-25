import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
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
 <div className='w-full min-h-screen h-full flex flex-col items-center justify-center'>

 </div>
);
}

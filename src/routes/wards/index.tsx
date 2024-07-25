import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { Wards } from './-components/list/Wards';
const searchparams = z.object({
  wardsq: z.string().optional(),
});
export const Route = createFileRoute('/wards/')({
  component: WardsPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
})

export function WardsPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center '>
  <Wards/>
 </div>
);
}

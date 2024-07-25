import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
const searchparams = z.object({
  wardsq: z.string().optional(),
});
export const Route = createFileRoute('/wards/')({
  component: WardsPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
})

interface WardsPageProps {

}

export function WardsPage({}:WardsPageProps){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center justify-center'>
  <h1 className='text-xl'>Wards</h1>
 </div>
);
}

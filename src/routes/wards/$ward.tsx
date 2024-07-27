import { createFileRoute } from '@tanstack/react-router'
import { oneWardsQueryOptions } from './-components/list/wards-query-options';

export const Route = createFileRoute('/wards/$ward')({
component: OneWardPage,
  loader({ context, params: { ward } }) {
    context.queryClient.ensureQueryData(oneWardsQueryOptions({ ward_id: ward }));
  },
});

export function OneWardPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One County</h1>
 </div>
);
}

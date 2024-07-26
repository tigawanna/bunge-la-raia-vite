import { createFileRoute } from '@tanstack/react-router'
import { oneMPsQueryOptions } from './-components/list/mps-query-options';



export const Route = createFileRoute("/mps/$mp")({
  component: OneMPPage,
  loader({ context, params: { mp } }) {
    context.queryClient.ensureQueryData(oneMPsQueryOptions({ mp_id: mp }));
  },
});

export function OneMPPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One MP</h1>
 </div>
);
}

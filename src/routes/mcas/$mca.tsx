import { createFileRoute } from '@tanstack/react-router'
import { oneMCAsQueryOptions } from './-components/list/mcas-query-options';



export const Route = createFileRoute("/mcas/$mca")({
  component: OneMCAPage,
  loader({ context, params: { mca } }) {
    context.queryClient.ensureQueryData(oneMCAsQueryOptions({ mca_id: mca }));
  },
});

export function OneMCAPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One MCA</h1>
 </div>
);
}

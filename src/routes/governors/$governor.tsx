import { createFileRoute } from '@tanstack/react-router'
import { oneGovernorQueryOptions } from './-components/list/governors-query-options';



export const Route = createFileRoute("/governors/$governor")({
  component: OneGovernorPage,
  loader({ context, params: { governor } }) {
    context.queryClient.ensureQueryData(oneGovernorQueryOptions({ governor_id:governor }));
  },
});

export function OneGovernorPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One Governor</h1>
 </div>
);
}

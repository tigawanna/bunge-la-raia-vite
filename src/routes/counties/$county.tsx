import { createFileRoute } from '@tanstack/react-router'
import { Onecounty } from './-components/view/Onecounty';
import { oneCountiesQueryOptions } from './-components/list/counties-query-options';

export const Route = createFileRoute("/counties/$county")({
  component: OneCountyPage,
  loader({context,params:{county}}) {
      context.queryClient.ensureQueryData(oneCountiesQueryOptions({county_id:county}));
  },
});

export function OneCountyPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <Onecounty/>
 </div>
);
}

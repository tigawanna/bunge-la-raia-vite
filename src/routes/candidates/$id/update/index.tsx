import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router'
import { oneCandidatesQueryOptions } from '../../-components/query';

export const Route = createFileRoute("/candidates/$id/update/")({
  component:AspirationsPage,
});

interface AspirationsPageProps {

}

export function AspirationsPage({}:AspirationsPageProps){
const params = useParams({ from: "/candidates/$id/" });
const query = useSuspenseQuery(oneCandidatesQueryOptions(params.id));
const data = query.data.data;
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
<h1 className='text-xl'>Aspirations page</h1>
 </div>
);
}

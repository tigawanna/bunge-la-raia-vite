import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { listUsersQueryOptions } from './-components/list/users-query-options';
import { Users } from './-components/list/Users';
const searchparams = z.object({
  ussq: z.string().optional(),
});
export const Route = createFileRoute("/users/")({
  component: UsersPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(listUsersQueryOptions({ search_query: "" }));
  },
});



export function UsersPage(){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
    <Users/>
 </div>
);
}

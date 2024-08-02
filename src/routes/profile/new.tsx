import { createFileRoute } from '@tanstack/react-router'
import { UserprofileForm } from './-components/form/UserProileForm';
import { authGuard } from '@/lib/tanstack/query/use-viewer';

export const Route = createFileRoute("/profile/new")({
  component: NewuserProfilepage,
  async beforeLoad(ctx) {
    await authGuard({ ctx });
  },
});


export function NewuserProfilepage(){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <UserprofileForm />
  </div>
);
}

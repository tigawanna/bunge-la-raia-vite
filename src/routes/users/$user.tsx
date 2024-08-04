import { createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { UserProfile } from '../profile/-components/view/UserProfile';

export const Route = createFileRoute('/users/$user')({
  component: OneUserPage,
  beforeLoad(ctx) {
    if(ctx.context.viewer?.data?.id === ctx.params.user){
      throw redirect({ to: "/profile" });
    }
  },
})




export function OneUserPage(){
  const param=useParams({
    from:"/users/$user"
  });
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
  <UserProfile user_id={param.user}/>
 </div>
);
}

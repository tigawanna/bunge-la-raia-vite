import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/')({
  component:ProfilePage
})
interface ProfilePageProps {

}

export function ProfilePage({}:ProfilePageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>profile page</h1>
 </div>
);
}

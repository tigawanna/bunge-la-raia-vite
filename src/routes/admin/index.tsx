import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component:AdminPage
})

interface AdminPageProps {

}

export function AdminPage({}:AdminPageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>Admin page</h1>
 </div>
);
}

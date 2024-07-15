import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mcas/')({
  component: () => <div>Hello /mcas/!</div>
})

interface WardsPageProps {

}

export function WardsPage({}:WardsPageProps){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center justify-center'>
  <h1 className='text-xl'>Wards</h1>
 </div>
);
}

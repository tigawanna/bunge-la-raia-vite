import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/governors/')({
  component: GovernorsPage
})
interface GovernorsPageProps {

}

export function GovernorsPage({}:GovernorsPageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>Governors</h1>
 </div>
);
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/')({
  component: CandidatesPage
})


interface CandidatesPageProps {

}

export function CandidatesPage({}:CandidatesPageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>Candidates</h1>
 </div>
);
}

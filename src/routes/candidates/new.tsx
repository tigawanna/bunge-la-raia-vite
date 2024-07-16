import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/new')({
  component: NewCandidatePage
})


interface NewCandidatePageProps {

}

export function NewCandidatePage({}:NewCandidatePageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>New Candidate</h1>
 </div>
);
}

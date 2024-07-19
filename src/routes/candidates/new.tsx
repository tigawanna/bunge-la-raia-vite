import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import { CandidateForm } from './-components/form/CandidateForm';
import { Loader } from 'lucide-react';


export const Route = createFileRoute('/candidates/new')({
  component: NewCandidatePage
})


interface NewCandidatePageProps {

}

export function NewCandidatePage({}:NewCandidatePageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <Suspense fallback={
    <div className='w-full h-full flex items-center justify-center min-h-[60vh] skeleton'>
      <Loader className='animate-spin'/>
    </div>
  }>
    <CandidateForm id={undefined}/>
  </Suspense>
 </div>
);
}

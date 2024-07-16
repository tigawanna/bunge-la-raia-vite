import { createFileRoute } from '@tanstack/react-router'
import { VibecheckForm } from './-components/form/Vibecheck/VibecheckForm';

export const Route = createFileRoute('/candidates/new')({
  component: NewCandidatePage
})


interface NewCandidatePageProps {

}

export function NewCandidatePage({}:NewCandidatePageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
    <VibecheckForm/>
 </div>
);
}

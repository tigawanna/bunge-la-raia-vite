import { createFileRoute } from '@tanstack/react-router'
import { BasicDetails } from './-components/form/basics-details/BasicDetails';
import { VibecheckForm } from './-components/form/vibe-check/VibecheckForm';


export const Route = createFileRoute('/candidates/new')({
  component: NewCandidatePage
})


interface NewCandidatePageProps {

}

export function NewCandidatePage({}:NewCandidatePageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
    <BasicDetails/>
    <VibecheckForm/>
 </div>
);
}

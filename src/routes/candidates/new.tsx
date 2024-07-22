import { createFileRoute } from '@tanstack/react-router'
import { CandidateBasicDetails } from './-components/form/basics-details/CandidateBasicDetails';


export const Route = createFileRoute('/candidates/new')({
  component: NewCandidatePage
})


interface NewCandidatePageProps {

}

export function NewCandidatePage({}:NewCandidatePageProps){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <CandidateBasicDetails/>
 </div>
);
}

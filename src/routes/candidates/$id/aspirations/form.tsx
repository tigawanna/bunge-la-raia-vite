import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/candidates/$id/aspirations/form")({
  component: CandidateAspirationFormPage,
});


interface CandidateAspirationFormPageProps {

}

export function CandidateAspirationFormPage({}:CandidateAspirationFormPageProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
  <h1 className='text-4xl'>candidate aspiration form</h1>
  <AspirationsForm/>
 </div>
);
}

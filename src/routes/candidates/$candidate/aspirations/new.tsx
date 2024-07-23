import { createFileRoute } from '@tanstack/react-router'
import { AspirationsForm } from './-components/form/AspirationsForm';

export const Route = createFileRoute('/candidates/$candidate/aspirations/new')({
  component: NewAspirationPage
})

interface NewAspirationPageProps {

}

export function NewAspirationPage({}:NewAspirationPageProps){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <AspirationsForm />
  </div>
);
}

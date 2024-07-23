import { createFileRoute } from '@tanstack/react-router'
import { AspirationsForm } from './-components/form/AspirationsForm';

export const Route = createFileRoute("/candidates/$candidate/aspirations/$aspiration/update")({
  component: UpdateAspirationPage,
});



export function UpdateAspirationPage(){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <AspirationsForm />
  </div>
);
}

import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute("/mcas/$mcas")({
  component: OneMCAPage,
});

export function OneMCAPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One MCA</h1>
 </div>
);
}

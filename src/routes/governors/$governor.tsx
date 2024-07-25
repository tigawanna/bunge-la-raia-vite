import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute("/governors/$governor")({
  component: OneGovernorPage,
});

export function OneGovernorPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One Governor</h1>
 </div>
);
}

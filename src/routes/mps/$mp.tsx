import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute("/mps/$mp")({
  component: OneMPPage,
});

export function OneMPPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One MP</h1>
 </div>
);
}

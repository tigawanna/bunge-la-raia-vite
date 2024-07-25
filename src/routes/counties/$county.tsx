import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/counties/$county")({
  component: OneCountyPage,
});

export function OneCountyPage(){
return (
 <div className='w-full h-full min-h-screen flex flex-col items-center justify-center'>
  <h1 className='text-xl'>One County</h1>
 </div>
);
}

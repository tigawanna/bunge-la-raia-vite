import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/governors/')({
  component: () => <div>Hello /governors/!</div>
})object({
  govsq: z.string().optional(),
});
export const Route = createFileRoute('/governors/')({
  component: GovernorsPage,
  validateSearch(input) {
    return searchparams.parse(input);
  },
})



export function GovernorsPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center '>
  <Governors/>
 </div>
);
}

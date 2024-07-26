import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/$candidate/update/')({
  component: () => <div>Hello /candidates/$candidate/update/!</div>
})y-options";


export const Route = createFileRoute("/candidates/$candidate/update/")({
  component: AspirationsPage,
});

interface AspirationsPageProps {}

export function AspirationsPage({}: AspirationsPageProps) {
  const params = useParams({ from: "/candidates/$candidate/" });
  const query = useSuspenseQuery(oneCandidateQueryOptions({ candidate_id: params.candidate }));

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl">Aspirations page</h1>
    </div>
  );
}

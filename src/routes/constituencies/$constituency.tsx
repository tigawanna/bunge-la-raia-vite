import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/constituencies/$constituency')({
  component: () => <div>Hello /constituencies/$constituency!</div>
})tuencies/$constituency")({
  component: OneConstituencyPage,
  loader({ context, params: { constituency } }) {
    context.queryClient.ensureQueryData(oneConstituenciesQueryOptions({ constituency_id: constituency }));
  },
});

export function OneConstituencyPage() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl">One County</h1>
    </div>
  );
}

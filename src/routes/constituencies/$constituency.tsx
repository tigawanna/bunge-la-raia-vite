import { createFileRoute } from '@tanstack/react-router'
import { oneConstituenciesQueryOptions } from './-components/list/counstituency-query-options';

export const Route = createFileRoute('/constituencies/$constituency')({
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

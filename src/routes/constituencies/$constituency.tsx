import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/constituencies/$constituency")({
  component: OneConstituencyPage,
});

export function OneConstituencyPage() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl">One County</h1>
    </div>
  );
}

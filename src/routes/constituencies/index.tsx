import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/constituencies/")({
  component: ConstituenciesPage,
});

interface ConstituenciesPageProps {}

export function ConstituenciesPage({}: ConstituenciesPageProps) {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center">
      <h1 className="text-xl">Constituencies</h1>
    </div>
  );
}

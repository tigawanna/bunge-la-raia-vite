import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/counties/")({
  component: CountiesPage,
});

interface CountiesPageProps {}

export function CountiesPage({}: CountiesPageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl">Governors</h1>
    </div>
  );
}

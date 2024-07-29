import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AspirationsForm } from "../../-components/aspirations/form/AspirationsForm";


export const Route = createFileRoute("/candidates/$candidate/aspirations/new")({
  component: NewAspirationPage,
});

interface NewAspirationPageProps {}

export function NewAspirationPage({}: NewAspirationPageProps) {
  const navigate = useNavigate({
    from: "/candidates/$candidate/aspirations/new",
  });
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <AspirationsForm navigate={navigate} justCreated />
    </div>
  );
}

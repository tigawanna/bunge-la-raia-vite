import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AspirationsForm } from "../../-components/aspirations/form/AspirationsForm";
import { z } from "zod";

const searchparams = z.object({
  is_fresh: z.boolean().optional(),
  form_step: z.number().optional().default(0),
});
export const Route = createFileRoute("/candidates/$candidate/aspirations/new")({
  component: NewAspirationPage,
  validateSearch: (search) => searchparams.parse(search),
});

interface NewAspirationPageProps {}

export function NewAspirationPage({}: NewAspirationPageProps) {
  const navigate = useNavigate({
    from: "/candidates/$candidate/aspirations/new",
  });
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <AspirationsForm navigate={navigate} start_from_basics={false} from="/candidates/$candidate/aspirations/new" />
    </div>
  );
}

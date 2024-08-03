import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { UpdateUserProfile } from "./-components/form/UpdateUserProfile";
import { oneUserQueryOptions } from "./-components/profile-query-options";
import { authGuard } from "@/lib/tanstack/query/use-viewer";

const searchparams = z.object({
  basics: z.boolean().optional(),
  is_fresh: z.boolean().optional(),
  form_step: z.number().optional().default(0),
});
export const Route = createFileRoute("/profile/update")({
  component: UpdateUserProfilepage,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(ctx) {
    await authGuard({ ctx });
  },
  loader: ({ context }) => {
    context.viewer?.data?.id &&
      context.queryClient.ensureQueryData(
        oneUserQueryOptions({ user_id: context.viewer?.data.id })
      );
  },
});

export function UpdateUserProfilepage() {
  const {basics} = useSearch({
    from:"/profile/update"
  })
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <UpdateUserProfile start_from_basics={basics??false}/>
    </div>
  );
}

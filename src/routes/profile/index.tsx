import { createFileRoute, redirect } from "@tanstack/react-router";
import { UserProfile } from "./-components/view/UserProfile";
import { oneUserQueryOptions } from "./-components/profile-query-options";
import { authGuard } from "@/lib/tanstack/query/use-viewer";

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
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
interface ProfilePageProps {}

export function ProfilePage({}: ProfilePageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center ">
      <UserProfile />
    </div>
  );
}

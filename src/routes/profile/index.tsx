import { createFileRoute } from "@tanstack/react-router";
import { UserProfile } from "./-components/view/UserProfile";
import { oneUserQueryOptions } from "./-components/profile-query-options";
import { authGuard, useViewer } from "@/lib/tanstack/query/use-viewer";

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
  const { userQuery } = useViewer();
  const viewer = userQuery.data.data;
  const user_id = viewer?.id!;
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center ">
      <UserProfile user_id={user_id} viewer_id={viewer?.id}/>
    </div>
  );
}

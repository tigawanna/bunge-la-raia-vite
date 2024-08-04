import { Navigate, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toaster } from "@/components/navigation/ParkuiToast";
import { oneUserQueryOptions } from "../profile-query-options";
import { UserprofileForm } from "./UserProileForm";
import { useViewer } from "@/lib/tanstack/query/use-viewer";

interface UpdateUserProfileProps {
  start_from_basics: boolean;
}

export function UpdateUserProfile({start_from_basics}: UpdateUserProfileProps) {
  const { userQuery } = useViewer();
  const navigate = useNavigate({
    from: "/profile/update",
  })
  const viewer = userQuery.data.data;
  const user_id = viewer?.id!;
  const query = useSuspenseQuery(oneUserQueryOptions({ user_id }));
  const one_user = query.data?.data;

  if (!one_user) {
    toaster.create({
      title: "User not found",
      description: "Redirecting back to users dashboard",
      type: "info",
    });
    return <Navigate to="/profile/new" />;
  }
  return (

    <div className="w-full h-full flex flex-col items-center justify-center">
      <UserprofileForm user_profile={one_user as any}  navigate={navigate} start_from_basics={start_from_basics}/>
    </div>
  );
}

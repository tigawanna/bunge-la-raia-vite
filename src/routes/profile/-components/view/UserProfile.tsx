import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { oneUserQueryOptions } from "../profile-query-options";
import { Link, Navigate } from "@tanstack/react-router";
import { toaster } from "@/components/navigation/ParkuiToast";
import { VibeCheckView } from "@/routes/-component/shared/VibeCheckView";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";

interface UserProfileProps {}

export function UserProfile({}: UserProfileProps) {
  const { userQuery } = useViewer();
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
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col items-center relative">
        <img
          src="https://picsum.photos/700/200"
          className="w-full h-[200px] object-cover absolute top-0"
        />
        <div className="w-full  flex flex-col  gap-3 absolute top-[100px] p-5">
          {one_user?.avatar_url && (
            <img src={one_user?.avatar_url} className="size-[150px] rounded-full" />
          )}
          <div className="h-full flex flex-col justify-center gap-1">
            <h1 className="text-xl">{one_user?.fullname}</h1>
            <h1 className="text-sm">{one_user?.email}</h1>
            <button className="text-sm rounded-lg border w-fit px-2 hover:bg-bg-emphasized">
              edit profile
            </button>
            <Link to="/profile/update" search={{is_fresh:true,form_step:0 }} className="text-sm rounded-lg border w-fit px-2 hover:bg-bg-emphasized">
              Edit profile
            </Link>
          </div>
          <p className="text-sm">
            {one_user?.bio}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sit saepe quo, ipsum
            eaque perspiciatis sint non, dolore fuga enim sapiente. Totam eos qui odio asperiores
            commodi doloremque, ducimus deleniti. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Minima sit saepe quo, ipsum eaque perspiciatis sint non, dolore fuga enim
            sapiente. Totam eos qui odio asperiores commodi doloremque, ducimus deleniti.
          </p>
          <div className="w-full">
            {/* @ts-expect-error */}
            {one_user?.vibe_check && one_user?.vibe_check.length > 0 && (
              <VibeCheckView vibe_check={one_user.vibe_check as VibeCheckType} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

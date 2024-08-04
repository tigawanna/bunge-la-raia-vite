import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { oneUserQueryOptions } from "../profile-query-options";
import { Link, Navigate } from "@tanstack/react-router";
import { VibeCheckView } from "@/routes/-component/shared/VibeCheckView";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";
import Avatar from "boring-avatars";
import { Plus } from "lucide-react";
interface UserProfileProps {}

export function UserProfile({}: UserProfileProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery.data.data;
  const user_id = viewer?.id!;
  const query = useSuspenseQuery(oneUserQueryOptions({ user_id }));
  const one_user = query.data?.data;

  if (!one_user) {
    return <Navigate to="/profile/new" />;
  }
  if (
    !one_user?.username ||
    one_user?.username === "" ||
    !one_user?.email ||
    one_user?.email === ""
  ) {
    return (
      <Navigate search={{ is_fresh: false, form_step: 0, basics: true }} to="/profile/update" />
    );
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col h-[200px] items-center relative">
        <img
          src={one_user?.banner_url ?? "https://picsum.photos/700/200"}
          className="w-full h-[200px] object-cover absolute top-0"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/700/200";
          }}
        />
        <div className="flex  justify-center gap-1 absolute top-[20%] left-[5%] z-20">
          {one_user?.avatar_url ? (
            <img
              src={one_user?.avatar_url}
              className="size-[150px] rounded-full"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/150/150";
              }}
            />
          ) : (
            <Avatar name={one_user.email || "Maria Mitchell"} size={150} variant="bauhaus" />
          )}
          <div className="flex flex-col gap-1  justify-center bg-slate-700/20 text-slate-100 rounded-lg p-1">
            <span className="flex flex-col md:flex-row gap-2  md:items-center">
              <h1 className="text-xl">{one_user?.fullname}</h1>
              <Link
                to="/profile/update"
                search={{ is_fresh: false, form_step: 0, basics: true }}
                className="text-sm rounded-lg border w-fit px-2 hover:bg-bg-emphasized">
                Edit profile
              </Link>
            </span>
            <h1 className="text-sm">{one_user?.email}</h1>

            <p className="text-sm">{one_user?.bio}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center">
        {/* @ts-expect-error */}
        {one_user?.vibe_check && one_user?.vibe_check.length > 0 ? (
           <div className="w-full h-full flex flex-col justify-center items-center p-2">
            <h1 className="text-xl">Vibe Check</h1>
          <VibeCheckView vibe_check={one_user.vibe_check as VibeCheckType} />
        </div>
        ) : (
          <div className="min-h-[50vh] flex justify-center items-center">
            <Link
              to="/profile/update"
              search={{ is_fresh: false, form_step: 0, basics: false }}
              className="rounded-lg border text-lg w-fit px-2 hover:bg-bg-emphasized flex gap-2 justify-center items-center">
              Do a vibe check <Plus className="size-10" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

import { useSuspenseQuery } from "@tanstack/react-query";
import { oneUserQueryOptions } from "../profile-query-options";
import { Link, Navigate } from "@tanstack/react-router";
import { VibeCheckView } from "@/routes/-component/shared/VibeCheckView";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";
import Avatar from "boring-avatars";
import { Plus } from "lucide-react";
interface UserProfileProps {
  user_id: string;
  viewer_id?: string;
}

export function UserProfile({ user_id, viewer_id }: UserProfileProps) {
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
      <div className="w-full flex flex-col h-[200px] sm:h-[300px] items-center relative">
        <img
          src={one_user?.banner_url ?? "/black-flag.webp"}
          className="w-full h-[150px] sm:h-[200px] object-cover absolute top-0"
          onError={(e) => {
            e.currentTarget.src = "/black-flag.webp";
          }}
        />
        {/* <div className="w-full h-[120px] z-10 object-cover absolute opacity-35 top-0 bg-gradient-to-r from-20% from-bg-muted " /> */}

        <div
          className="w-full flex sm:flex-row flex-col justify-center 
          sm:justify-between items-start sm:items-end gap-1 absolute top-[120px] bottom-0 left-0 z-20 
          p-4">
          <img
            src={one_user?.avatar_url ?? "/kenya-globe.png"}
            height={120}
            width={120}
            className="aspect-square sm:size-[150px] rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/kenya-globe.png";
            }}
          />
          <div className=" flex flex-col h-fit justify-cente rrounded-lg p-1">
            <span className="flex flex-col  md:flex-row  md:items-cente">
              <h1 className="text-xl">{one_user?.fullname}</h1>
              {viewer_id && (
                <Link
                  to="/profile/update"
                  search={{ is_fresh: false, form_step: 0, basics: true }}
                  className="text-sm rounded-lg border w-fit px-2 hover:bg-bg-emphasized">
                  Edit profile
                </Link>
              )}
            </span>
            <h1 className="text-sm">{one_user?.email}</h1>
          </div>
        </div>
      </div>

      <div className="pt-[10%] md:pt-[2%] w-full h-full flex flex-col justify-center items-center">
        {one_user?.bio && one_user?.bio.length > 0 && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-xl">Bio</h1>
            <p className="text-sm">{one_user?.bio}</p>
          </div>
        )}
        {/* @ts-expect-error */}
        {one_user?.vibe_check && one_user?.vibe_check?.length > 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center p-2">
            <h1 className="text-xl">Vibe Check</h1>
            <VibeCheckView vibe_check={one_user.vibe_check as VibeCheckType} />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            {viewer_id && (
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
        )}
      </div>
    </div>
  );
}

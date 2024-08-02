import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { oneUserQueryOptions } from "../profile-query-options";
import { Navigate } from "@tanstack/react-router";
import { toaster } from "@/components/navigation/ParkuiToast";
import Avatar from "boring-avatars";


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
      return <Navigate to="/profile/new"  />;
    }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Avatar name="Maria Mitchell" size={200} square/>;
      <div className="w-full h-full flex flex-col items-center justify-center p-3">
        <div className="w-full h-full flex l items-center justify-center p-3">
          <h1 className="text-xl">{one_user?.fullname}</h1>
          {one_user?.avatar_url && <img src={one_user?.avatar_url} />}
        </div>
        <p className="text-sm p-5">
          {one_user?.bio}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sit saepe quo, ipsum eaque
          perspiciatis sint non, dolore fuga enim sapiente. Totam eos qui odio asperiores commodi
          doloremque, ducimus deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Minima sit saepe quo, ipsum eaque perspiciatis sint non, dolore fuga enim sapiente. Totam
          eos qui odio asperiores commodi doloremque, ducimus deleniti.
        </p>
      </div>
    </div>
  );
}

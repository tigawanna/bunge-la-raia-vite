
import { useAdmin, useViewer } from "@/lib/tanstack/query/use-viewer";

interface HomeComponentProps {}

export function HomeComponent({}: HomeComponentProps) {
  const { userQuery } = useViewer();
  const raia = userQuery.data.data?.raia
  const viewer = userQuery.data.data?.user
  return (
    <div className="w-full h-full flex flex-col min-h-screen items-center justify-center">
      <div className="p-5 rounded-lg border">
        <h1 className="text-xl">{viewer?.email}</h1>
        <h1 className="text-xl">{raia?.name}</h1>
      </div>
    </div>
  );
}

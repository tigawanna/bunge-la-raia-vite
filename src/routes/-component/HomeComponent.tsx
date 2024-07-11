import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { useAdmin, useViewer } from "@/lib/tanstack/query/use-viewer";

interface HomeComponentProps {}

export function HomeComponent({}: HomeComponentProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery.data;
  const adminQuery = useAdmin(viewer?.id || "");
  if (adminQuery.data.error) {
    return (
      <div className="w-full h-full flex flex-col min-h-screen items-center justify-center">
        <ErrorOutput
          error={{
            name: adminQuery.data.error?.hint || adminQuery.data.error?.message,
            message: adminQuery.data.error?.details,
          }}
        />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col min-h-screen items-center justify-center">
      <div className="p-5 rounded-lg border">
        <h1 className="text-xl">{viewer?.email}</h1>
        <h1 className="text-xl">{adminQuery.data?.data?.name}</h1>
      </div>
    </div>
  );
}

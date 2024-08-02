import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainNavbar } from "@/components/navigation/MainNavbar";
import { ParkuiToast } from "@/components/navigation/ParkuiToast";
import { SupabaseViewerResponse, TypedSupabaseClient } from "@/lib/supabase/client";
import { TailwindIndicator } from "@/components/misc/tailwind-indicator";


export const Route = createRootRouteWithContext<{
  supabase: TypedSupabaseClient;
  queryClient: QueryClient;
  viewer?: SupabaseViewerResponse;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="h-full min-h-screen flex flex-col bg-bg-default text-fg-default">
        <MainNavbar />
        <Outlet />
        <ParkuiToast />
      </div>
      <TailwindIndicator/>
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}

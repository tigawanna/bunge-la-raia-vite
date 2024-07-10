import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainNavbar } from "@/components/MainNavbar";
import { ParkuiToast } from "@/components/navigation/ParkuiToast";
import { RecordAuthResponse } from "pocketbase";
import { SupabaseUser, TypedSupabaseClient } from "@/lib/supabase/client";


export const Route = createRootRouteWithContext<{
  supabase: TypedSupabaseClient;
  queryClient: QueryClient;
  viewer?: RecordAuthResponse<SupabaseUser>;
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
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}

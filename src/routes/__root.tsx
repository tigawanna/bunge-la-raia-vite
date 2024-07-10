import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainNavbar } from "@/components/MainNavbar";
import { PocketBaseClient } from "@/lib/pb/client";
import { ParkuiToast } from "@/components/navigation/ParkuiToast";
import { PropertyUserResponse } from "@/lib/pb/database";
import { RecordAuthResponse } from "pocketbase";

export const Route = createRootRouteWithContext<{
  pb: PocketBaseClient;
  queryClient: QueryClient;
  viewer?: RecordAuthResponse<PropertyUserResponse>
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

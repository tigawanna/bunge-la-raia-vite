import ReactDOM from "react-dom/client";
import { RouterProvider, ErrorComponent, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles.css";
import "@park-ui/tailwind-plugin/preset.css";
import { useViewer } from "./lib/tanstack/query/use-viewer";
import { supabase } from "./lib/supabase/client";
import { CardsListSuspenseFallback } from "./components/loaders/GenericDataCardsListSuspenseFallback";


export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (_, __, ___, mutation) => {
      if (Array.isArray(mutation.meta?.invalidates)) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        mutation.meta?.invalidates.forEach((key) => {
          return queryClient.invalidateQueries({
            queryKey: [key.trim()],
          });
        });
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <CardsListSuspenseFallback/>
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient,
    viewer: undefined,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const { userQuery } = useViewer();
console.log("======================== main.tsx query.viewer ====================== ",userQuery.data)
  return (
    <>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        context={{
          queryClient,
          viewer: userQuery.data,
          supabase
        }}
      />
    </>
  );
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    // </React.StrictMode>
  );
}

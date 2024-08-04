import {
  getSupabaseViewer,
  supabase,
  SupabaseViewerResponse,
  TypedSupabaseClient,
} from "@/lib/supabase/client";
import {
  QueryClient,
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { BeforeLoadContext } from "node_modules/@tanstack/react-router/dist/esm/route";


export const viewerqueryOptions = queryOptions({
  queryKey: ["viewer"],
  queryFn: async () => {
    const user = await getSupabaseViewer();
    return user;
  },
  staleTime: 1000 * 60 * 60,
});

export function useViewer() {
  const qc = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
      qc.invalidateQueries(viewerqueryOptions);
    },
  });
  return { userQuery: useSuspenseQuery(viewerqueryOptions), logoutMutation };
}

interface AuthGuardProps {
  ctx: BeforeLoadContext<
    {},
    Record<never, string>,
    {
      supabase: TypedSupabaseClient;
      queryClient: QueryClient;
      viewer?: SupabaseViewerResponse;

    }
  >;

  reverse?: boolean;
}
export async function authGuard({ ctx, reverse }: AuthGuardProps) {
  // @ts-expect-error
  const returnTo = ctx.search?.returnTo ?? "/";
  const user = ctx.context?.viewer?.data;
  console.log(" ============ user in ",ctx.location.pathname," guard =========== ", user);

  if (!user) {
    // console.log(" ++++++++ no user redirectiong to auth ++++++ ");
    throw redirect({
      to: "/auth",
      search: {
        returnTo: ctx.location.pathname,
      },
    });
  }
  // redirect beck if a user exists , to be used in auth routes
  if (reverse) {
    // console.log(" ++++++++ user exists in auth redirecting back ++++++ ");
    throw redirect({
      to: returnTo ?? "/",
    });
  }
}

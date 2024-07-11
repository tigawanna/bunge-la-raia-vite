import {
  getSupabaseUser,
  supabase,
  SupabaseUser,
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
import { RecordAuthResponse } from "pocketbase";

export const viewerqueryOptions = queryOptions({
  queryKey: ["viewer"],
  queryFn: () =>
    getSupabaseUser()
      .then((res) => res.data.user)
      .catch(() => null),
  staleTime: 1000 * 60 * 60,
});


export const adminqueryOptions =(id:string)=>{
  return queryOptions({
    queryKey: ["viewer", "admin", id],
    queryFn: () =>
      getAdmin(id),
    staleTime: 1000 * 60 * 60,
  });

} 

export async function getAdmin(id: string) {
  return await supabase.from("admin").select("*").eq("user_id", id).single();
}

export function useAdmin(id: string) {
  return useSuspenseQuery(adminqueryOptions(id));
}
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
      viewer?: RecordAuthResponse<SupabaseUser>;
    }
  >;

  reverse?: boolean;
}
export async function authGuard({ ctx, reverse }: AuthGuardProps) {
  // @ts-expect-error
  const returnTo = ctx.search?.returnTo ?? "/";
  const user = ctx.context?.viewer;
  // console.log(" ============ user in ",ctx.location.pathname," guard =========== ", user);
  // console.log(" ============ user in ",ctx.location.pathname," guard =========== ", user);

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

import { toaster } from "@/components/navigation/ParkuiToast";
import { IconButton } from "@/components/park/ui/icon-button";
import { supabase } from "@/lib/supabase/client";
import { viewerqueryOptions } from "@/lib/tanstack/query/use-viewer";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FaGoogle } from "react-icons/fa6";
import { Loader } from "lucide-react";

interface OauthSigninButtonsProps {}

export function OauthSigninButtons({}: OauthSigninButtonsProps) {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (provider: "google") => {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) {
        throw error;
      }
    },
    onSuccess() {
      qc.invalidateQueries(viewerqueryOptions);
    },
    onError(error) {
      console.log(error.name);
      toaster.create({
        title: "Something went wrong",
        description: `${error.message}`,
        type: "error",
        duration: 20000,
      });
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <IconButton
        variant="solid"
        className="flex justify-evenly items-center gap-3 px-3"
        onClick={() => mutation.mutate("google")}
        disabled={mutation.isPending}>
        <FaGoogle className="size-6" />
        <span>Sign in with Google</span>
        {mutation.isPending && <Loader />}
      </IconButton>
    </div>
  );
}

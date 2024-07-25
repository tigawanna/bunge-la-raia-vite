import { supabase } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import counties from "./county.json";
import { Loader } from "lucide-react";
import Nprogress from "@/components/navigation/nprogress/Nprogress";
interface AddCountiesProps {}

const countiyRows = counties.map((county) => {
  return {
    id: county.code,
    entry_contributed_by: "a30db214-2b4d-4d6e-8ea3-ef427f3a3077",
    entry_verified_by: "a30db214-2b4d-4d6e-8ea3-ef427f3a3077",
    ...county,
  };
});
export function AddCounties({}: AddCountiesProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      await supabase.from("counties").insert(countiyRows);
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative">
      <div className="w-full absolute top-0">
        <Nprogress isAnimating={mutation.isPending} />
      </div>
      <button
        className="bg-bg-emphasized p-2 rou"
        disabled={mutation.isPending}
        onClick={() => {
          mutation.mutate();
        }}>
        add counties {mutation.isPending && <Loader className="animate-spin" />}
      </button>
    </div>
  );
}

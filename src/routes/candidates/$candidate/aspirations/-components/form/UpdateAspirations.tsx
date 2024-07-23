import { useParams, Navigate } from "@tanstack/react-router";
import { AspirationsForm } from "./AspirationsForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { toaster } from "@/components/navigation/ParkuiToast";

interface UpdateAspirationsProps {}

export function UpdateAspirations({}: UpdateAspirationsProps) {
  const { aspiration, candidate } = useParams({
    from: "/candidates/$candidate/aspirations/$aspiration/update",
  });

  const query = useSuspenseQuery({
    queryKey: ["candidates", candidate, "candidate_aspirations", aspiration],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("candidate_aspirations")
        .select("*")
        .eq("id", aspiration)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  const one_aspiration = query.data;

  if (!one_aspiration) {
    toaster.create({
      title: "Aspiration not found",
      description: "Redirecting back to aspirations dashboard",
      type: "info",
    });
    return <Navigate to="/candidates/$candidate/aspirations" params={{ candidate }} />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* @ts-expect-error */}
      <AspirationsForm aspiration={one_aspiration} />
    </div>
  );
}

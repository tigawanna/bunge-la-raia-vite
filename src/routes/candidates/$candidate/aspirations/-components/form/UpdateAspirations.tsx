import { useParams } from "@tanstack/react-router";
import { AspirationsForm } from "./AspirationsForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

interface UpdateAspirationsProps {

}

export function UpdateAspirations({}:UpdateAspirationsProps){
  const {aspiration,candidate} = useParams({
    from:"/candidates/$candidate/aspirations/$aspiration/update"
  })
  const query = useSuspenseQuery({
    queryKey: ["candidates",candidate,"candidate_aspirations",aspiration],
    queryFn: async () => {
      return await supabase
        .from("candidate_aspirations")
        .select("*")
        .eq("id", candidate)
        .eq("id", aspiration)
        .single();
    }
  })
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <AspirationsForm />
  </div>
);
}

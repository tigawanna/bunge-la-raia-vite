import { toaster } from "@/components/navigation/ParkuiToast";
import { supabase } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { VibecheckForm } from "@/components/forms/vibe-check/VibecheckForm";
import { VibecheckFormMutationProps } from "@/components/forms/vibe-check/types";
import { user_questions } from "./user-questions";
import { UserProfileRowType } from "../types";

interface UserVibeCheckFormProps {
  profile_id: string;
  user_profile: UserProfileRowType;
  next: () => void;
}

export function UserVibeCheckForm({
  user_profile,
  profile_id,
  next,
}: UserVibeCheckFormProps) {
  const { form_step } = useSearch({
    from: "/profile/update",
  });
  const navigate = useNavigate({
    from: "/profile/update",
  });
  const mutation = useMutation({
    mutationFn: async ({ vibe }: VibecheckFormMutationProps) => {
      const { error } = await supabase
        .from("users")
        .update({
          vibe_check: vibe,
        })
        .eq("id", user_profile.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toaster.create({
        title: "Vibe checked",
        type: "success",
      });
      next();
    },
    onError: (error) => {
      toaster.create({
        title: "Something went wrong",
        description: `${error.message}`,
        type: "error",
        duration: 20000,
      });
    },
    meta: {
      invalidates: ["user", profile_id],
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <VibecheckForm
        navigate={navigate}
        questions={user_questions}
        form_step={form_step}
        mutation={mutation}
        vibe_check={user?.vibe_check}
      />
    </div>
  );
}

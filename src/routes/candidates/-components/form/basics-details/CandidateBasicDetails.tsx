import { ResizeTextAreaFormField, TextFormField } from "@/lib/react-hook-form/TextFields";
import { CandidateInsertType, CandidateRowType } from "../../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm, SubmitHandler } from "react-hook-form";
import { ImageURLInputField } from "@/lib/react-hook-form/ImageInput";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useNavigate } from "@tanstack/react-router";

interface CandidateBasicDetailsProps {
  candidate?: CandidateRowType | null;
}

export function CandidateBasicDetails({ candidate }: CandidateBasicDetailsProps) {
  const { userQuery } = useViewer();
  const navigate = useNavigate({
    from: "/candidates/new",
  });
  const viewer = userQuery?.data?.data;

  const { register, handleSubmit, formState, watch } = useForm<CandidateInsertType>({
    defaultValues: {
      name: candidate?.name ?? viewer?.fullname ?? "",
      bio: candidate?.bio ?? viewer?.bio ?? "",
      account_id: candidate?.account_id ?? viewer?.id ?? "",
      avatar_url: candidate?.avatar_url ?? viewer?.avatar_url ?? "",
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: CandidateInsertType) => {
      return await supabase.from("candidates").upsert(data).returns();
    },
    onSuccess: () => {
      navigate({ to: "/candidates/$id", params: { id: viewer?.id! } });
    },
    meta:{
      invalidates:["candidates",viewer?.id]
    }
  });
  const onSubmit: SubmitHandler<CandidateInsertType> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[90%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center p-[2%] bg-bg-muted rounded-md gap-4 overflow-auto">
        {/* register your input into the hook by invoking the "register" function */}
        <TextFormField<CandidateInsertType>
          fieldKey="name"
          formState={formState}
          register={register}
          required
        />
        <ResizeTextAreaFormField<CandidateInsertType>
          fieldKey="bio"
          formState={formState}
          register={register}
          required
        />
        <ImageURLInputField<CandidateInsertType>
          fieldKey="avatar_url"
          formState={formState}
          register={register}
          watch={watch}
          required
        />
        <MutationButton label="Save" type="submit" mutation={mutation} />
      </form>
    </div>
  );
}

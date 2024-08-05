import { ResizeTextAreaFormField, TextFormField } from "@/lib/react-hook-form/TextFields";
import { CandidateInsertType, CandidateRowType } from "../../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm, SubmitHandler } from "react-hook-form";
import { ImageURLInputField } from "@/lib/react-hook-form/ImageInput";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { toaster } from "@/components/navigation/ParkuiToast";
import { DismissableAlert } from "@/components/wrappers/DismissableAlert";

interface CandidateBasicDetailsFormProps {
  next: (candidate: CandidateRowType) => void;
  candidate?: CandidateRowType | null;
}

export function CandidateBasicDetailsForm({ candidate, next }: CandidateBasicDetailsFormProps) {
  const { userQuery } = useViewer();

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
      const { error } = await supabase.from("candidates").upsert(data).returns();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (data) => {
      // navigate({ to: "/candidates/$candidate", params: { candidate: viewer?.id! } });
      toaster.create({
        title: "Success",
        description: `Aspiration created successfully`,
        type: "success",
      });
      next(data as any as CandidateRowType);
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
      invalidates: ["candidates", viewer?.id],
    },
  });
  const onSubmit: SubmitHandler<CandidateInsertType> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[90%] md:w-[60%] lg:w-[50%] h-fit flex flex-col items-center bg-bg-emphasized justify-center p-[5%] lg:p-[3%] rounded-lg gap-4 overflow-auto">
        <h1 className="text-xl font-bold">Candidate Basic Details</h1>

        <DismissableAlert
          className=" text-sm bg-error text-error-content text-center"
          message="prefer not using your real name and images  to encourage your message to speak louder"
        />

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

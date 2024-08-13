import { CandidateInsertType, CandidateRowType } from "../../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { toaster } from "@/components/navigation/ParkuiToast";
import { DismissableAlert } from "@/components/wrappers/DismissableAlert";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ImageURLInputField, ResizeTextAreaFormField, TextFormField } from "@/lib/tanstack/form/TextFields";
import { z } from "zod";

interface CandidateBasicDetailsFormProps {
  next: (candidate: CandidateRowType) => void;
  candidate?: CandidateRowType | null;
}

export function CandidateBasicDetailsForm({ candidate, next }: CandidateBasicDetailsFormProps) {
  const { userQuery } = useViewer();

  const viewer = userQuery?.data?.data;

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
  const form = useForm<CandidateInsertType>({
    defaultValues: {
      name: candidate?.name ?? viewer?.fullname ?? "",
      bio: candidate?.bio ?? viewer?.bio ?? "",
      account_id: candidate?.account_id ?? viewer?.id ?? "",
      avatar_url: candidate?.avatar_url ?? viewer?.avatar_url ?? "",
      banner_url: candidate?.banner_url ?? viewer?.banner_url ?? "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutate(value);
    },
  });
  return (
    <div className="w-full h-full py-5 flex flex-col items-center justify-center ">


      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-[90%] md:w-[60%] lg:w-[50%] h-fit flex flex-col items-center bg-bg-emphasized justify-center p-[5%] lg:p-[3%] rounded-lg gap-4 overflow-auto">
        <h1 className="text-xl font-bold">Candidate Basic Details</h1>

        <DismissableAlert
          className=" text-sm bg-error text-error-content text-center"
          message="prefer not using your real name and images  to encourage your message to speak louder"
        />
        <form.Field
          name="name"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextFormField<CandidateInsertType>
                field={field}
                fieldKey="name"
                fieldlabel="name"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />

        <form.Field
          name="bio"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <ResizeTextAreaFormField<CandidateInsertType>
                field={field}
                fieldKey="bio"
                fieldlabel="Bio"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />

        <form.Field
          name="avatar_url"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <ImageURLInputField<CandidateInsertType>
                field={field}
                fieldKey="avatar_url"
                fieldlabel="Avatar url"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
        <form.Field
          name="banner_url"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <ImageURLInputField<CandidateInsertType>
                field={field}
                fieldKey="banner_url"
                fieldlabel="Banner url"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />

        <MutationButton label="Save" type="submit" mutation={mutation} />
      </form>
    </div>
  );
}

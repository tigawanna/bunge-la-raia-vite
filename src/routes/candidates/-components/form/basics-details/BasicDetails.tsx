import { TextAreaFormField, TextFormField } from "@/lib/react-hook-form/TextFields";
import { CandidateInsertType, CandidateRowType } from "../../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCurrentLocation } from "@/utils/hooks/use-current-location";

interface BasicDetailsProps {
  candidates?: CandidateRowType;
}

export function BasicDetails({ candidates }: BasicDetailsProps) {
  const { userQuery } = useViewer();
  const {location,error} = useCurrentLocation()
  const viewer = userQuery?.data?.data;
  const { register, handleSubmit,formState } = useForm<CandidateInsertType>({
    defaultValues: {
      name: candidates?.name ?? "",
      bio: candidates?.bio ?? "",
      gps: candidates?.gps ??location?.latitude.toString() + "," + location?.longitude.toString() ?? "",
      period: candidates?.period ?? "",
      vying_for: candidates?.vying_for ?? "mca",
      account_id: viewer?.id ?? "",
    },
  });
  const onSubmit: SubmitHandler<CandidateInsertType> = (data) => console.log(data);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col items-center justify-center">
        {/* register your input into the hook by invoking the "register" function */}
        <TextFormField<CandidateInsertType>
          fieldKey="name"
          formState={formState}
          register={register}
          required
        />
        <TextAreaFormField<CandidateInsertType>
          fieldKey="bio"
          formState={formState}
          register={register}
          required
        />
      </form>
    </div>
  );
}

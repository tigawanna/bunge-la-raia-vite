import { CandidateBasicDetailsForm } from "./basics-details/CandidateBasicDetailsForm";

interface CandidateFormProps {}

export function CandidateForm({}: CandidateFormProps) {
  return (
    <div className="w-full h-full flex flex-col p-2 gap-4 items-center justify-center">
      <div className="w-full h-full flex p-2 gap-4 items-center justify-center ">
        <CandidateBasicDetailsForm />
      </div>
    </div>
  );
}

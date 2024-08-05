import { IconButton } from "@/components/park/ui/icon-button";
import { EllipsisVertical,XIcon } from "lucide-react";
import * as Dialog from "~/components/park/ui/dialog";
import { CandidateBasicDetailsForm } from "./CandidateBasicDetailsForm";
import { CandidateRowType } from "../../types";

interface CandidateBasicDetailsDialogProps {
  candidate?: CandidateRowType | null;
}

export function CandidateBasicDetailsDialog({ candidate }: CandidateBasicDetailsDialogProps) {
  return (
    <Dialog.Root >
      <Dialog.Trigger asChild>
        <EllipsisVertical />
      </Dialog.Trigger>
      <Dialog.Backdrop className="" />
      <Dialog.Positioner>
        <Dialog.Content className="w-full h-full ">
          <CandidateBasicDetailsForm candidate={candidate} next={()=>{}}/>
          <Dialog.CloseTrigger asChild className="absolute top-[2%] right-[2%]">
            <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

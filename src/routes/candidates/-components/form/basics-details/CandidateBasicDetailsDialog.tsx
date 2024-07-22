import { IconButton } from "@/components/park/ui/icon-button";
import { EditIcon, XIcon } from "lucide-react";
import * as Dialog from "~/components/park/ui/dialog";
import { CandidateBasicDetailsForm } from "./CandidateBasicDetailsForm";
import { CandidateRowType } from "../../types";

interface CandidateBasicDetailsDialogProps {
  candidate?: CandidateRowType | null;
}

export function CandidateBasicDetailsDialog({candidate}: CandidateBasicDetailsDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <EditIcon />
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className="w-full h-full ">

            <CandidateBasicDetailsForm candidate={candidate} />

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

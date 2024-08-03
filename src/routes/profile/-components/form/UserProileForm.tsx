import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";
import { UserProfileBasicsForm } from "./UserBasicsForm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UseNavigateResult } from "@tanstack/react-router";
import { UserProfileRowType } from "../types";
import { UserVibeCheckForm } from "./UserVibeCheckForm";

interface UserprofileFormProps {
  user_profile?: UserProfileRowType;
  navigate?: UseNavigateResult<"/profile/update">;
  start_from_basics?: boolean;
}

export function UserprofileForm({
  user_profile,
  navigate,
  start_from_basics,
}: UserprofileFormProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;
  const [formStep, setFormStep] = useState(start_from_basics ? 0 : 1);
  const canGoToNext = formStep < 1 && user_profile;
  const canGoToPrevious = formStep > 0 && user_profile;
  function handleNext() {
    if (canGoToNext) {
      setFormStep((prev) => prev + 1);
    }
  }
  function handlePrevious() {
    if (canGoToPrevious) {
      setFormStep((prev) => prev - 1);
    }
  }
  if (viewer?.id == null) return;
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      {canGoToPrevious && (
        <ChevronLeft className="size-20 hidden lg:flex" onClick={() => handlePrevious()} />
      )}

      <div className="w-full h-full flex flex-col items-center justify-between p-2">
        {formStep === 0 && (
          <UserProfileBasicsForm
            user_profile={user_profile}
            next={() => {
              if (navigate && !user_profile) {
                if (start_from_basics) {
                  navigate({
                    to: "/profile/update",
                    search: { is_fresh: true, form_step: 0 },
                  });
                }
                navigate({
                  to: "/profile",
                  search: { is_fresh: false, form_step: 0 },
                });
              }
              if (user_profile) {
                setFormStep((prev) => prev + 1);
              }
            }}
          />
        )}
        {formStep === 1 && user_profile && (
          <UserVibeCheckForm
            profile_id={user_profile.id}
            user_profile={user_profile}
            next={() => {
              if (navigate) {
                navigate({
                  to: "/profile",
                });
              }
              handleNext();
            }}
          />
        )}
        <div className="w-full h-full lg:hidden flex items-center justify-between gap-2">
          {canGoToPrevious && <ChevronLeft className="size-8" onClick={() => handlePrevious()} />}
          {canGoToNext && <ChevronRight className="size-8" onClick={() => handleNext()} />}
        </div>
      </div>
      {canGoToNext && (
        <ChevronRight className="size-20 hidden lg:flex" onClick={() => handleNext()} />
      )}
    </div>
  );
}

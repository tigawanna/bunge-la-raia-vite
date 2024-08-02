import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";
import { AspirationBasicsForm } from "./UserBasicsForm";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { UseNavigateResult, useSearch } from "@tanstack/react-router";
import { UserProfileRowType } from "../types";


interface userprofileFormProps {
  user_profile?: UserProfileRowType;
  navigate?: UseNavigateResult<"/profile/update">;
  justCreated?: boolean;
}

export function userprofileForm({ user_profile, navigate, justCreated }: userprofileFormProps) {
  const {is_fresh} = useSearch({
    from:"/profile/update",
  });
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;
  const [formStep, setFormStep] = useState((user_profile && !is_fresh) ? 1 : 0);
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
          <AspirationBasicsForm
            user_profile={user_profile}
            viewer={{
              id: viewer?.id,
            }}
            next={(asp) => {
              if (navigate && !user_profile) {
                if (justCreated) {
                  navigate({
                    to: "/candidates/$candidate/user_profiles/$user_profile/update",
                    search: { is_fresh: true, form_step: 0 },
                    params: {
                      candidate: viewer?.id,
                      user_profile: asp.id,
                    },
                  });
                }
                navigate({
                  to: "/candidates/$candidate/user_profiles/$user_profile/update",
                  search: { is_fresh: false, form_step: 0 },
                  params: {
                    candidate: viewer?.id,
                    user_profile: asp.id,
                  },
                });
              }
              if (user_profile) {
                setFormStep((prev) => prev + 1);
              }
            }}
          />
        )}
        {formStep === 1 && user_profile && (
          <AspirationVibeCheckForm
            candidate_id={viewer?.id}
            user_profile={user_profile}
            next={() => {
              if (navigate) {
                navigate({
                  to: "/candidates/$candidate/user_profiles/$user_profile",
                  params: {
                    candidate: viewer?.id,
                    user_profile: user_profile.id,
                  },
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

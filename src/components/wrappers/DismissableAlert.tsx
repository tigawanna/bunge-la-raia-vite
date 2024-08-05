import { X } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface DismissableAlertProps {
  className?: string;
  message: string;
}

export function DismissableAlert({ className, message }: DismissableAlertProps) {
  const [dismaissed, setDismissed] = useState(false);
  if (dismaissed) return null;
  return (
    <p className={twMerge("p-1 rounded-lg px-3 flex  items-center justify-between gap-3", className)}>
      {message} <X onClick={() => setDismissed(true)} className="size-4"/>
    </p>
  );
}

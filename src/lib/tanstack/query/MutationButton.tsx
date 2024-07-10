import { Button, ButtonProps } from "@/components/park/ui/button";
import type { UseMutationResult } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface MutationButtonProps extends ButtonProps {
  label?: React.ReactNode;
  mutation: UseMutationResult<any, any, any, any>;
  className?: string;
  loaderClassname?: string;
}

export function MutationButton({
  mutation,
  label,
  className,
  loaderClassname,
  ...props
}: MutationButtonProps) {
  return (
    <Button
      className={twMerge(
        "min-w-[80%] md:min-w-[50%] flex gap-2 justify-center font-bold items-center",
        className
      )}
      disabled={mutation.isPending}
      {...props}>
      {label || <div> Submit</div>}
      {mutation.isPending && <Loader className={twMerge("animate-spin", loaderClassname)} />}
    </Button>
  );
}

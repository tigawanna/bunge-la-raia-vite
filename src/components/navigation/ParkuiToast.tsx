import { XIcon } from "lucide-react";
import * as Toast from "~/components/park/ui/toast";
import { Button } from "../park/ui/button";
import { IconButton } from "../park/ui/icon-button";
import { tv } from "tailwind-variants";
interface ParkuiToastProps {}

const toastStyles = tv(
  {
    defaultVariants: {
      type: "info",
    },
    variants: {
      type: {
        info: "toast--type__info",
        success: "toast--type__success",
        warning: "toast--type__warning",
        error: "toast--type__error",
        loading: "toast--type__loading",
      },
    },
  },
  { twMerge: false }
);

export const toaster = Toast.createToaster({
  placement: "top",
  overlap: true,
  gap: 16,
});
export function ParkuiToast({}: ParkuiToastProps) {
  return (
    <>
      <Toast.Toaster toaster={toaster}>
        {(toast) => (
          // @ts-expect-error
          <Toast.Root key={toast.id} className={toastStyles({ type: toast.type })}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.ActionTrigger asChild>
              <Button variant="link" size="sm">
                Action
              </Button>
            </Toast.ActionTrigger>
            <Toast.CloseTrigger asChild>
              <IconButton size="sm" variant="link">
                <XIcon />
              </IconButton>
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toast.Toaster>
    </>
  );
}

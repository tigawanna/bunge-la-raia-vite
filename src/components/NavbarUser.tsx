import * as Dialog from "~/components/park/ui/dialog";
import { IconButton } from "./park/ui/icon-button";
import { UserCircleIcon, XIcon } from "lucide-react";
import { Button } from "./park/ui/button";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { Avatar } from "./park/ui/avatar";
import { Link, useLocation } from "@tanstack/react-router";
interface NavbarUserProps {}

export function NavbarUser({}: NavbarUserProps) {
  const { userQuery, logoutMutation } = useViewer();

  const location = useLocation();
  const user = userQuery?.data.data?.user;
  const raia = userQuery?.data.data?.raia
  if (!user) {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <UserCircleIcon />
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="absolute top-[10%] right-[2%] w-[40%] h-fit p-5 bg-bg-muted">
            <div className="flex flex-col gap-2 h-full w-full  p-5">
              <div className="flex flex-col gap-2 w-full justify-end">
                <Dialog.CloseTrigger asChild>
                  <Link
                    to="/auth"
                    className="bg-accent-emphasized p-2"
                    search={{ returnTo: location.pathname }}>
                    Login
                  </Link>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.CloseTrigger>
              </div>
            </div>
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
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Avatar
          className="border-accent-text border-2"
          name={raia?.name}
          src={raia?.avatar_url||""}
        />
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className="absolute top-[10%] right-[2%] w-[40%] h-fit p-5 bg-bg-muted">
          <div className="flex flex-col gap-2 h-full w-full  p-5">
            <div className="flex flex-col gap-2 w-full">
              <Dialog.Title>{raia?.name}</Dialog.Title>
              <Dialog.Description>{user.email}</Dialog.Description>
            </div>
            <div className="flex gap-2 w-full justify-end">
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.CloseTrigger>
              <Button className="bg-error" onClick={() => logoutMutation.mutate()}>
                Logout
              </Button>
            </div>
          </div>
          <Dialog.CloseTrigger asChild className="absolute top-4 right-4">
            <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

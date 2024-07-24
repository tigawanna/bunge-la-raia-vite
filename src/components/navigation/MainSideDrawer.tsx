import { Link } from "@tanstack/react-router";
import { LogIn, Menu, XIcon } from "lucide-react";
import * as Drawer from "~/components/park/ui/drawer";
import { IconButton } from "~/components/park/ui/icon-button";
import { navbarRoutes } from "./navbar-routes";
import { ThemeToggle } from "./ThemeToggle";
import { SideDrawerAccordion } from "./SideDrawerAccordion";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import * as Dialog from "~/components/park/ui/dialog";
import { Avatar } from "../park/ui/avatar";
import { Button } from "../park/ui/button";

export function MainSideDrawer(props: Drawer.RootProps) {
  const { userQuery, logoutMutation } = useViewer();
  const viewer = userQuery?.data?.data;
  return (
    <Drawer.Root {...props}>
      <Drawer.Trigger asChild>
        <IconButton variant="ghost">
          <Menu />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <Link to="/" className="hover:text-accent-text">
                  Bunge la raia
                </Link>
              </Drawer.CloseTrigger>
            </Drawer.Title>

            {/* <Drawer.Description>Description</Drawer.Description> */}
            <Drawer.CloseTrigger asChild className="absolute top-4 right-4">
              <IconButton variant="ghost">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>
            <div className="w-full flex flex-col  justify-startjustify-center gap-2">
              <div className="flex gap-2">
                {viewer ? (
                  <div className="flex  gap-2 h-full w-full justify-center items-center">
                    <Avatar
                      className=""
                      name={viewer?.fullname ?? viewer?.username ?? "uwu"}
                      src={viewer?.avatar_url || ""}
                    />
                    <div className="flex w-full justify-center gap-3">
                      <div className="flex flex-col w-full">
                        <Dialog.Title>{viewer?.username ?? viewer?.fullname}</Dialog.Title>
                        <Dialog.Description>{viewer?.email}</Dialog.Description>
                      </div>
                      <Button className="bg-error" onClick={() => logoutMutation.mutate()}>
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (

                    <Drawer.CloseTrigger
                      asChild
                      className="w-full flex justify-center items-center">
                      <Link
                        className="w-full bg-bg-emphasized p-3 flex justify-center items-center gap-3  rounded-lg hover:text-accent-text"
                        to="/auth"
                        search={{
                          returnTo: window.location.pathname,
                        }}>
                        Login <LogIn />
                      </Link>
                    </Drawer.CloseTrigger>
     
                )}
                <div className=" flex gap-3 justify-evenly">
                  <ThemeToggle />
                </div>
              </div>
              {navbarRoutes.map((route) => {
                if (route.path === "/profile" && !viewer) return;
                if (route.path === "/admin" && viewer?.user_role !== "admin") return;
                return (
                  <Drawer.CloseTrigger asChild className="" key={route.name}>
                    <Link
                      key={route.name}
                      to={route.path}
                      className="flex justify-start items-center gap-4 text-base font-normalhover:bg-bg-emphasized border-b hover:text-accent-text p-2">
                      <route.icon className="size-4" />
                      {route.name}
                    </Link>
                  </Drawer.CloseTrigger>
                );
              })}
              <SideDrawerAccordion />
            </div>
          </Drawer.Body>
          <Drawer.Footer className="flex gap-3 ">{new Date().toISOString()}</Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

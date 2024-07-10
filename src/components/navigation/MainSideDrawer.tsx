import { Link } from "@tanstack/react-router";
import { Menu, XIcon } from "lucide-react";
import * as Drawer from "~/components/park/ui/drawer";
import { IconButton } from "~/components/park/ui/icon-button";
import { navbarRoutes } from "./navbar-routes";
import { ThemeToggle } from "./ThemeToggle";


export function MainSideDrawer(props: Drawer.RootProps) {
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
                  Property Manager
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
              {navbarRoutes.map((route) => (
                <Link
                  key={route.name}
                  to={route.path}
                  className="flex justify-start items-center gap-4 text-base font-normalhover:bg-bg-emphasized border-b hover:text-accent-text p-2">
                  <route.icon />
                   {route.name}
                </Link>
              ))}
            </div>
          </Drawer.Body>
          <Drawer.Footer className="justify-start items-center">
            <ThemeToggle/>
            <p className="text-sm">{new Date().toLocaleDateString()}</p>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

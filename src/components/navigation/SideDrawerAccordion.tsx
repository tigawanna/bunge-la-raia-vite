import * as Accordion from "@/components/park/ui/accordion";
import { ChevronDownIcon, Map, UsersRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { locationRoutes, positionsRoutes } from "./navbar-routes";
interface SideDrawerAccordionProps {}

export function SideDrawerAccordion({}: SideDrawerAccordionProps) {
  return (
    <Accordion.Root multiple className="px-3">
      <Accordion.Item key={"locations"} value={"locations"}>
        <Accordion.ItemTrigger>
          <span className="flex justify-center items-center gap-3">
            <Map className="size-4" />
            locations
          </span>
          <Accordion.ItemIndicator>
            <ChevronDownIcon className="size-4" />
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <div className="w-full flex flex-col  justify-startjustify-center gap-2 ">
            {locationRoutes.map((route) => {
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className="flex justify-start items-center gap-4 text-base font-normalhover:bg-bg-emphasized border-b hover:text-accent-text p-2">
                  {route.name}
                </Link>
              );
            })}
          </div>
        </Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item key={"positions"} value={"positions"}>
        <Accordion.ItemTrigger>
          <span className="flex justify-center items-center gap-3">
            <UsersRound className="size-4" />
            positions
          </span>
          <Accordion.ItemIndicator>
            <ChevronDownIcon />
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <div className="w-full flex flex-col  justify-startjustify-center gap-2">
            {positionsRoutes.map((route) => {
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className="flex justify-start items-center gap-4 text-base font-normalhover:bg-bg-emphasized border-b hover:text-accent-text p-2">
                  {route.name}
                </Link>
              );
            })}
          </div>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}

import * as HoverCard from "~/components/park/ui/hover-card";
import { positionsRoutes } from "./navbar-routes";
import { Link } from "@tanstack/react-router";
import { ChevronDown, UsersRound } from "lucide-react";
interface PositionshoverCardProps {}

export function PositionshoverCard({}: PositionshoverCardProps) {
  return (
    <HoverCard.Root immediate>
      <HoverCard.Trigger asChild>
        <span className="flex gap-2 items-center justify-center cursor-pointer hover:text-accent-text">
          Positions <ChevronDown className="size-4" />
        </span>
      </HoverCard.Trigger>

      <HoverCard.Positioner>
        <HoverCard.Content className="bg-bg-emphasized rounded-lg">
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          <div className="flex gap-2 justify-center items-center">
            <div className="w-[40%]">
              <UsersRound className="size-24" />
            </div>
            <div className="flex flex-wrap gap-3">
              {positionsRoutes.map((route) => {
                return (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="h-full w-fit underline hover:text-accent-text">
                    {route.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Root>
  );
}

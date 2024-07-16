import { Link, useRouterState } from "@tanstack/react-router";
import { MdCastle } from "react-icons/md";
import { LocationshoverCard } from "./LocationshoverCard";
import { MainSideDrawer } from "./MainSideDrawer";
import { navbarRoutes } from "./navbar-routes";
import { NavbarUser } from "./NavbarUser";
import Nprogress from "./nprogress/Nprogress";
import { ThemeToggle } from "./ThemeToggle";
import { PositionshoverCard } from "./PositionshoverCard";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
interface MainNavbarProps {}

export function MainNavbar({}: MainNavbarProps) {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const  {userQuery} = useViewer()
  const viewer = userQuery?.data?.data
  return (
    <nav className="w-full h-full flex flex-co  items-center justify-center py-1 px-3 border-b sticky top-0 z-30">
      <div className="w-full h-full flex items-center justify-between ">
        <Link to="/" className="">
          <MdCastle className="size-8" />
        </Link>
        <div className=" h-full hidden md:flex  gap-3 px-6 py-1 justify-center items-center rounded-full border">
          {navbarRoutes.map((route) => {
            if (route.path === "/") return;
            if(route.path === "/profile" && !viewer) return
            if(route.path === "/admin" && viewer?.user_role!=="admin") return
            return (
              <Link key={route.path} to={route.path} className="h-full  hover:text-accent-text">
                {route.name}
              </Link>
            );
          })}
        <LocationshoverCard />
        <PositionshoverCard/>
        </div>
        <div className=" h-full hidden sm:flex gap-2 justify-center items-center rounded-full ">
          <NavbarUser />
          <ThemeToggle />
        </div>
        <div className="h-full md:hidden">
          <MainSideDrawer />
        </div>
      </div>
      <Nprogress isAnimating={isLoading} />
    </nav>
  );
}

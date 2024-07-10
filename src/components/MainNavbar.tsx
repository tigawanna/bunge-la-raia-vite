import { Link, useRouterState } from "@tanstack/react-router";
import Nprogress from "./navigation/nprogress/Nprogress";
import { MdCastle } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { MainSideDrawer } from "./navigation/MainSideDrawer";
import { navbarRoutes } from "./navigation/navbar-routes";
import { ThemeToggle } from "./navigation/ThemeToggle";
import { NavbarUser } from "./NavbarUser";
interface MainNavbarProps {}

export function MainNavbar({}: MainNavbarProps) {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return (
    <nav className="w-full h-full flex flex-co  items-center justify-center py-1 px-3 border-b sticky top-0 z-30">
      <div className="w-full h-full flex items-center justify-between ">
        <Link to="/" className="">
          <MdCastle className="size-8" />
        </Link>
        <div className=" h-full hidden md:flex  gap-3 px-6 py-1 justify-center items-center rounded-full border">
          {navbarRoutes.map((route) => {
            if (route.path === "/") return;
            return (
              <Link key={route.path} to={route.path} className="h-full  hover:text-accent-text">
                {route.name}
              </Link>
            );
          })}
        </div>
        <div className=" h-full hidden sm:flex gap-2 justify-center items-center rounded-full ">
          <Link to="/auth" search={{ returnTo: "/" }}>
            <FaCircleUser className="size-6" />
          </Link>
          <NavbarUser/>
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

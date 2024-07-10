import { HomeIcon, LayoutDashboard, Users2Icon } from "lucide-react";

export const navbarRoutes = [
  {
    name: "home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "admin",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "profile",
    path: "/profile",
    icon: Users2Icon,
  },

] as const

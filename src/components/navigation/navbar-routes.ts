import { HomeIcon, Users2Icon } from "lucide-react";

export const navbarRoutes = [
  {
    name: "home",
    path: "/",
    icon: HomeIcon,
  },

  {
    name: "profile",
    path: "/profile",
    icon: Users2Icon,
  },
  {
    name: "admin",
    path: "/admin",
    icon: Users2Icon,
  },
  {
    name: "mps",
    path: "/mps",
    icon: Users2Icon,
  },
] as const;

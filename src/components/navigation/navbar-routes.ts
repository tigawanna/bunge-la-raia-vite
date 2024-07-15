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
  }
] as const;

export const locationRoutes = [
  {
    name: "counties",
    path: "/counties",
  },
  {
    name: "constituencies",
    path: "/constituencies",
  },
  {
    name: "wards",
    path: "/wards",
  },
] as const
export const positionsRoutes = [
  {
    name: "governors",
    path: "/governors",
  },
  {
    name: "mps",
    path: "/mps",
  },
  {
    name: "mcas",
    path: "/mcas",
  },
] as const

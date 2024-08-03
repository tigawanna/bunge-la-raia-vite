import { Link } from "@tanstack/react-router";
import { useTSRBreadCrumbs } from "./use-bread-crumbs";
import { ChevronRight } from "lucide-react";

interface TSRBreadCrumbsProps {}

export function TSRBreadCrumbs({}: TSRBreadCrumbsProps) {
  const { breadcrumb_routes } = useTSRBreadCrumbs();

  return (
    <div className="w-full flex flex-wrap md:justify-end gap-0.1 p-1">
      {breadcrumb_routes.map((crumb) => {
        if (breadcrumb_routes.length - 1 === breadcrumb_routes?.indexOf(crumb)) {
          return <span key={crumb.path} className="text-xs bread-crumbs-links">{crumb.name}</span>;
        }
        return (
          <span key={crumb.path} className="flex gap-1 justify-center items-center">
            <Link className="text-xs bread-crumbs-links" to={crumb.path}>
              {crumb.name}
            </Link>
            <ChevronRight className="size-4" />
          </span>
        );
      })}
    </div>
  );
}

import { useLocation } from "@tanstack/react-router";


export function useTSRBreadCrumbs() {
  const current = useLocation();
  // console.log("current === ",current);
  const route_history = current.pathname
    .split("/")
    .filter((x) => x && x.length > 0);
  // console.log("route history ==== ",route_history)
  const breadcrumb_routes = route_history.reduce(
    (acc: { name: string; path: string }[], route) => {
      const prev_path = acc[acc.length - 1]?.path ?? "";
      acc.push({ name: route, path: `${prev_path}/${route}` });
      return acc;
    },
    [],
  );
  // console.log("breadcrumbs routes  === ",breadcrumb_routes);
  return { breadcrumb_routes };
}

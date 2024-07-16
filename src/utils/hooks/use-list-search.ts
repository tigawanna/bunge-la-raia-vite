import { routeTree } from "@/routeTree.gen";
import { ParseRoute, useNavigate } from "@tanstack/react-router";
import { useTransition, useState, useEffect } from "react";
import { useDebouncedValue } from "./use-debouncer";

type ValidRoutes = ParseRoute<typeof routeTree>["fullPath"];
interface UseListSearchProps {
  route: ValidRoutes;
  sq: string;
}
export function useListSearch({ route, sq }: UseListSearchProps) {
  const navigate = useNavigate({ from: route });
  const [_, startTransition] = useTransition();
  const [keyword, setKeyword] = useState(sq ?? "");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  useEffect(() => {
    if (sq !== debouncedValue) {
      startTransition(() => {
        navigate({
          search: {
            sq: debouncedValue,
          },
        });
      });
    }
  }, [debouncedValue]);
    return { debouncedValue, isDebouncing, keyword, setKeyword };
}

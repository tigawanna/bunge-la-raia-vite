import { useNavigate } from "@tanstack/react-router";
import { useTransition, useState, useEffect } from "react";
import { useDebouncedValue } from "./use-debouncer";
import { ValidRoutes } from "@/lib/tanstack/types";


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

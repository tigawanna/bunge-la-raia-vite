import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../client";
import { Database } from "../db-types";
import { SearchBox } from "@/components/search/SearchBox";
import { Link } from "@tanstack/react-router";
import { useListSearch } from "@/utils/hooks/use-list-search";
import { Plus } from "lucide-react";
import { ValidRoutes } from "@/lib/tanstack/types";
import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { Suspense } from "react";

export type TableType = keyof Database["public"]["Tables"];
export type DatabaseTableType = Database["public"]["Tables"];

interface TableRelationInputProps<T extends TableType> {
  table: T;
  filterBy: keyof DatabaseTableType[T]["Row"];
  route: ValidRoutes;
  searchQuery: string;
  setItem: (row: Database["public"]["Tables"][T]["Row"]) => void;
  createNewRoute?: ValidRoutes;
}

export function TableRelationInput<T extends TableType>({
  table,
  filterBy,
  route,
  searchQuery,
  createNewRoute,
  setItem,
}: TableRelationInputProps<T>) {
  // const { aspsq } = useSearch({
  //   from: "/candidates/$candidate/aspirations/",
  // });
  const { debouncedValue, isDebouncing, keyword, setKeyword } = useListSearch({
    route,
    sq: searchQuery ?? "",
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full z-20 sticky top-[9%] p-2 px-3 flex flex-col md:flex-row justify-evenly gap-1 pr-5">
        <div className="w-full flex gap-5 p-1">
          <h1 className="font-bold  ">{table}</h1>
          {createNewRoute && (
            <Link
              to={createNewRoute}
              className="flex justify-center items-center gap-2 border rounded-lg px-2 hover:text-accent-text">
              <Plus /> add
            </Link>
          )}
        </div>
        <SearchBox
          inputProps={{
            placeholder: "Search by name",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <TableRelationInputList
            table={table}
            filterBy={filterBy}
            keyword={keyword}
            setItem={setItem}
          />
        </Suspense>
      </div>
    </div>
  );
}

interface TableRelationInputListProps<T extends TableType> {
  table: TableType;
  filterBy: keyof DatabaseTableType[T]["Row"];
  keyword: string;
  setItem: (row: Database["public"]["Tables"][T]["Row"]) => void;
}

export function TableRelationInputList<T extends TableType>({
  table,
  filterBy,
  keyword,
  setItem,
}: TableRelationInputListProps<T>) {
  const query = useSuspenseQuery({
    queryKey: [table, keyword],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .ilike(filterBy as string, keyword)
        .limit(10);

      if (error) {
        throw error;
      }
      return data;
    },
  });
  const data = query.data;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="w-full h-full flex flex-col items-center justify-center">
        {data?.map((row) => (
          <li
            key={row.id}
            onClick={() => setItem(row)}
            className="w-full h-full flex items-center justify-center">
            {row[filterBy as keyof typeof row]}
          </li>
        ))}
      </ul>
    </div>
  );
}

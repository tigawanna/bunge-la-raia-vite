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
import { CloseTrigger } from "@/components/park/ui/dialog";

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
      <div className="w-full z-20 sticky top-0 md:top-[9%] p-2 px-3 flex flex-col md:flex-row justify-evenly gap-1 pr-5">
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
            placeholder: `search by ${filterBy as string}`,
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
            keyword={debouncedValue}
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
        .ilike("name", `%${keyword}%`)
        .order("name", { ascending: true })
        .limit(10);

      if (error) {
        throw error;
      }
      return data;
    },
  });
  const data = query.data;

if(!data || data.length === 0) {
    return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="p-[5%] bg-bg-subtle text-center min-w-[70%] rounded-lg ">No data</h1>
    </div>
  )
}

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      <ul className="w-full flex flex-wrap gap-2 justify-center p-1">
        {data?.map((row) => (
          <CloseTrigger key={row.id} asChild className="">
            <li
              key={row.id}
              onClick={() => setItem(row)}
              className="border min-w-[100px] bg-bg-default hover:bg-accent-emphasized 
              cursor-pointer border-accent-text rounded-lg  p-2 flex items-center justify-center
              h-16 w-[95%] md:w-[40%] lg:w-[30%]  flex-col   gap-2 
              ">
              {row[filterBy as keyof typeof row]}
            </li>
          </CloseTrigger>
        ))}
      </ul>
    </div>
  );
}

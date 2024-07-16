import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { SearchBox } from "@/components/search/SearchBox";
import { useListSearch } from "@/utils/hooks/use-list-search";
import { Link, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import { CandidatesList } from "./CandidatesList";
import { Plus } from "lucide-react";

interface CandidatesProps {}

export function Candidates({}: CandidatesProps) {
  const { sq } = useSearch({
    from: "/candidates/",
  });
  const { debouncedValue, isDebouncing, keyword, setKeyword } = useListSearch({
    route: "/candidates",
    sq: sq ?? "",
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full z-20 sticky top-[9%] p-2 px-3 flex flex-col md:flex-row justify-evenly gap-1 pr-5">
        <div className="w-full flex gap-5 p-1">
          <h1 className="text-2xl font-bold  ">Candidates</h1>
          <Link
            to="/candidates/new"
            className="flex justify-center items-center gap-2 border rounded-lg px-2 hover:text-accent-text">
            <Plus /> apply
          </Link>
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

      <div className="w-full h-full flex justify-center items-center m-3 p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <CandidatesList q={debouncedValue} />
        </Suspense>
      </div>
    </div>
  );
}

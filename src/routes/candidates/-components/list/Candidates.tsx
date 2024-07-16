import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { SearchBox } from "@/components/search/SearchBox";
import { useListSearch } from "@/utils/hooks/use-list-search";
import { useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import { CandidatesList } from "./CandidatesList";

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
      <div className="w-full z-20 bg-bg-emphasized sticky top-[9%] p-2 px-3 flex flex-col md:flex-row justify-evenly gap-1 pr-5">
        <div className="w-full flex gap-2 p-1">
          <h1 className="text-2xl font-bold bg-base-200/30 ">Candidates</h1>
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
        <CardsListSuspenseFallback />
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <CandidatesList q={debouncedValue} />
        </Suspense>
      </div>
    </div>
  );
}

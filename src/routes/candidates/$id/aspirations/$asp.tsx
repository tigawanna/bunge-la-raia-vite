import { CardsListSuspenseFallback } from '@/components/loaders/GenericDataCardsListSuspenseFallback';
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Suspense } from 'react';
import { OneAspiration } from './-components/view/OneAspiration';

export const Route = createFileRoute("/candidates/$id/aspirations/$asp")({
  component:OneAspirationPage,
});

interface OneAspirationPageProps {

}

export function OneAspirationPage({}:OneAspirationPageProps){
  const {asp,id} = useParams({ from: "/candidates/$id/aspirations/$asp" });
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <Suspense fallback={<CardsListSuspenseFallback />}>
      <OneAspiration candidate_id={id}  aspiration_id={asp} />
    </Suspense>
  </div>
);
}

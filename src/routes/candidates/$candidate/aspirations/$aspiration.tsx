import { CardsListSuspenseFallback } from '@/components/loaders/GenericDataCardsListSuspenseFallback';
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Suspense } from 'react';
import { OneAspiration } from './-components/view/OneAspiration';

export const Route = createFileRoute("/candidates/$candidate/aspirations/$aspiration")({
  component:OneAspirationPage,
});

interface OneAspirationPageProps {

}

export function OneAspirationPage({}:OneAspirationPageProps){
  const {candidate,aspiration} = useParams({ from: "/candidates/$candidate/aspirations/$aspiration" });
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <Suspense fallback={<CardsListSuspenseFallback />}>
      <OneAspiration candidate_id={candidate}  aspiration_id={aspiration} />
    </Suspense>
  </div>
);
}

import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from './-component/landing/HeroSection';

export const Route = createFileRoute("/intro")({
  component: IntroPage,
});




export function IntroPage(){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <HeroSection />
  </div>
);
}

import { HeroSection } from "./landing/HeroSection";

interface HomeComponentProps {}

export function HomeComponent({}: HomeComponentProps) {
  return (
    <div className="w-full h-full flex flex-col min-h-screen items-center justify-center">
      {/* <div className="p-5 rounded-lg border">
        <h1 className="text-xl">{viewer?.email}</h1>
        <h1 className="text-xl">{viewer?.username}</h1>
      </div> */}
      <HeroSection/>
    </div>
  );
}

import { Icons } from "@/components/icons/Iconts";
import { Link } from "@tanstack/react-router";




interface HappyCitizenProps {}

export function HappyCitizen({}: HappyCitizenProps) {
  return (
    <div
      className="w-full h-screen flex flex-col md:flex-row justify-center items-center  text-primary animate-in 
      slide-in-from-bottom duration-700 fade-in-50 gap-10 md:gap-3">
      <p className="flex w-full justify-center text-center text-balance md:w-[50%] text-5xl md:text-6xl ">
        You're a happy law abiding citizen
      </p>
      <div className="flex justify-center  w-full md:w-[40%] ">
        <Icons.happy className="fill-primary min-h-[100px] h-[250px] " />
      </div>
    </div>
  );
}

interface InconvinienceProps {}

export function Inconvinience({}: InconvinienceProps) {
  return (
    <div
      className="w-full h-screen flex flex-col md:flex-row justify-center items-center  text-primary animate-in 
      slide-in-from-left duration-700 fade-in-50 gap-10 md:gap-3">
      <div className="flex justify-center  w-full md:w-[40%] ">
        <Icons.bad_road className="fill-primary min-h-[100px] h-[250px] " />
      </div>
      <p className="flex w-full justify-center text-center text-balance md:w-[50%] text-5xl md:text-6xl ">
        You run into inconvinience
      </p>
    </div>
  );
}
interface AngryAtGovermentProps {}

export function AngryAtGoverment({}: AngryAtGovermentProps) {
  return (
    <div
      className="w-full overflow-x-hidden h-screen flex flex-col md:flex-row justify-center items-center  text-primary animate-in 
      slide-in-from-left duration-1000 fade-in-50 gap-10 md:gap-3">
      <div className="flex justify-center  w-full md:w-[40%] ">
        <Icons.angry className="fill-primary min-h-[100px] h-[250px] " />
      </div>
      <p className="flex w-full justify-center text-center text-balance md:w-[50%] text-5xl md:text-6xl ">
        You blame the goverment {"(maybe rightly so)"}
      </p>
    </div>
  );
}
interface InTheirShoesProps {}

export function InTheirShoes({}: InTheirShoesProps) {
  return (
    <div className="w-full h-screen p-1 slide-in-from-right duration-1000 fade-in-50">
      <div
        className="h-[80%] flex flex-col md:flex-row justify-center items-center  text-primary animate-in 
       gap-10 md:gap-3">
        <p className="flex w-full justify-center text-center text-balance md:w-[50%] text-4xl md:text-6xl ">
          But what would you do differently if you were the president
        </p>
        <div className="flex justify-center w-full md:w-[40%] ">
          <Icons.president className="fill-primary min-h-[100px] h-[250px] " />
        </div>
      </div>
      <div className="w-full text-sm flex justify-center items-center gap-2">
        <Link
          to="/candidates/new"
          className=" z-50 bg-accent-emphasized  text-lg hover:bg-bg-muted text-bg-muted
        px-3 py-1 rounded-lg flex justify-center items-center gap-2">
          <div className=" ">See if you'd be a good leader</div>
        </Link>
        <Link
          to="/profile"
          className=" z-50 bg-accent-emphasized text-lg hover:bg-bg-muted text-bg-muted
          px-3 py-1 rounded-lg flex justify-center items-center gap-2">
          <div className="">Just create a regular profile</div>
        </Link>
      </div>
    </div>
  );
}

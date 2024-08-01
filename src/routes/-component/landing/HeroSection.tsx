"use client";
import { AngryAtGoverment, HappyCitizen, InTheirShoes, Inconvinience } from "./Slides";
import { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/park/ui/button";

interface HeroSectionProps {}

const slides_arr = [HappyCitizen, Inconvinience, AngryAtGoverment, InTheirShoes];
export function HeroSection({}: HeroSectionProps) {
  const [slides, setSlides] = useState(slides_arr);
  const [slideIndex, setSlideIndex] = useState(0);

  const canShowPrev = slideIndex > 0;
  const canShowNext = slideIndex < slides.length - 1;

  const prevSlide = () => {
    setSlideIndex((slide) => {
      if (!(slide > 0)) return slide;
      return slide - 1;
    });
  };
  const nextSlide = () => {
    setSlideIndex((slide) => {
      if (!(slide < slides.length - 1)) {
        return slide;
      }

      return slide + 1;
    });
  };

  useEffect(() => {
    const keyBoardSliding = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }
      if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };
    document.addEventListener("keydown", keyBoardSliding);

    return () => {
      document.removeEventListener("keydown", keyBoardSliding);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative text-accent-text fill-accent-text">
      <div key={slideIndex}>{slides[slideIndex]?.({})}</div>
      {canShowPrev && (
        <button
          className="absolute bottom-[45%] left-1 "
          disabled={!canShowPrev}
          onClick={() => prevSlide()}>
          <ChevronLeft className="size-16" />
        </button>
      )}

      {canShowNext && (
        <button
          className="absolute bottom-[45%] right-1 "
          disabled={!canShowNext}
          onClick={() => nextSlide()}>
          <ChevronRight className="size-16" />
        </button>
      )}
    </div>
  );
}

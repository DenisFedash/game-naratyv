"use client";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import right from "/public/icon/chevron-right.svg";
import left from "/public/icon/chevron-left.svg";
import "keen-slider/keen-slider.min.css";

type Props = {
  children: React.ReactNode;
  breakpoints: {};
  sessionStorageKey: string;
};

export const GamesBreakpoints = {
  "(min-width: 768px)": {
    slides: { perView: 1 },
    initial: 0,
  },
  "(min-width: 1440px)": {
    slides: { perView: 2, spacing: 48 },
    initial: 0,
  },
};

export const TeamBreakpoints = {
  "(min-width: 768px)": {
    slides: { perView: 2, spacing: 48 },
    initial: 0,
  },
  "(min-width: 1440px)": {
    slides: { perView: 3 },
    initial: 0,
  },
};

const CardSlider = ({ children, breakpoints, sessionStorageKey }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: breakpoints,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
  });

  const handlePrevClick = (e: any) => {
    e.preventDefault();
    if (instanceRef.current) {
      instanceRef.current.prev();
    }
  };

  const handleNextClick = (e: any) => {
    e.preventDefault();
    if (instanceRef.current) {
      instanceRef.current.next();
    }
  };

  useEffect(() => {
    if (sessionStorage) {
      const storedSlideIndex = sessionStorage.getItem(sessionStorageKey);
      if (storedSlideIndex) {
        instanceRef.current?.moveToIdx(parseInt(storedSlideIndex));
      }
    }
  }, [instanceRef]);

  useEffect(() => {
    if (sessionStorage) {
      sessionStorage.setItem(sessionStorageKey, currentSlide.toString());
    }
  }, [currentSlide]);

  return (
    <>
      <div className="mb-4 md:mb-8 lg:mb-14 keen-slider" ref={sliderRef}>
        {children}
      </div>
      {loaded && instanceRef.current && (
        <>
          <div className="hidden lg:block">
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-2xl text-gray-700 hover:text-gray-900"
              onClick={handlePrevClick}
            >
              <Image
                src={left}
                alt="prev-btn"
                width={24}
                height={24}
                priority={true}
                className=" w-auto h-auto"
              />
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-2xl text-gray-700 hover:text-gray-900"
              onClick={handleNextClick}
            >
              <Image
                src={right}
                alt="next-btn"
                width={24}
                height={24}
                priority={true}
                className=" w-auto h-auto"
              />
            </button>
          </div>
          <div className="dots mb-5 md:mb-8">
            {[
              ...Array(instanceRef.current.track.details?.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default CardSlider;

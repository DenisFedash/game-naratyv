"use client";

import React, { useState } from "react";
import { FC } from "react";
import { GalleryComponentsPropsId } from "@/interfaces/Props.interface";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import dataGallery from "../../../public/data/dataGallery.json"; 
import { GallerySlideItem } from "../utils/GallerySlideItem/GallerySlideItem";


export const GallerySlider: FC<GalleryComponentsPropsId> = ({ textTr, lang }) => { 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    rtl: true,
    slides: {
      perView: 3,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="navigation-wrapper">
      <div ref={sliderRef} className="keen-slider h-[269px] cursor-pointer">
         {dataGallery.map((item, id) => (  
          <div key={id} className="keen-slider__slide bg-main-white rounded-lg border border-main-yellow">
            <GallerySlideItem id={item.id} lang={lang} textTr={textTr} />
          </div>
        ))} 
      </div>
      {loaded && instanceRef.current && (
        <div className="dots mt-[48px] mb-[48px] accent-main-yellow">
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={"dot accent-main-yellow" + (currentSlide === idx ? " active" : "")}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

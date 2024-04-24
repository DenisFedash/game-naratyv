"use client";

import React, { useState, useEffect, FC } from "react";
import { GalleryComponentsPropsId } from "@/interfaces/Props.interface";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { GallerySlideItem } from "../utils/GallerySlideItem/GallerySlideItem";
import { getGallery } from "@/app/(server)/api/gallery/data";


export const GallerySlider: FC<GalleryComponentsPropsId> = ({ textTr, lang }) => { 
  const [gallery, setGallery] = useState([]);
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

  useEffect(() => {
   const fetchGallery = async () => {
    try {
      const gallery = await getGallery(); 
      setGallery(gallery)
    } catch (error) {
      console.log("error fetching gallery:", error)
    }
   };
   fetchGallery();
  }, []);

  return (
    <div className="navigation-wrapper">
      <div ref={sliderRef} className="keen-slider h-[269px] cursor-pointer">
         { gallery.map((item, index) => (  
          <div key={item.gallery_uuid} className="keen-slider__slide bg-main-white rounded-lg border border-main-yellow">
            <GallerySlideItem id={item.gallery_uuid} lang={lang} textTr={textTr} />
          </div>
        ))} 
      </div>
      {loaded && instanceRef.current?.track?.details?.slides && (
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
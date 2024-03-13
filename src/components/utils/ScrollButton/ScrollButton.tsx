"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import iconUp from "../../../../public/icon/icon-arrow.svg";

export const ScrollButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!isVisible && window.scrollY > 100) {
        setIsVisible(true);
      } else if (isVisible && window.scrollY <= 100) {
        setIsVisible(false);
      }
    };

    checkScrollTop();

    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="hidden lg:block fixed z-10 bottom-24 right-20 border border-main-font-color rounded-lg shadow-3xl p-2 bg-main-white hover:bg-orange"
        >
          <Image src={iconUp} alt="icon-up" width={24} height={24} />
        </button>
      )}
    </>
  );
};

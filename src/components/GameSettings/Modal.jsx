"use client";

import React, { useRef, useEffect } from "react";

export const Modal = ({ 
  isOpenModal, 
  setIsOpenModal}
  ) => {
  const modalRef = useRef();

  useEffect(() => {
     const handleClickOutside = (event) => {
       if (modalRef.current && !modalRef.current.contains(event.target)) {
         setIsOpenModal(false);
       }
     };

    document.addEventListener("mousedown", handleClickOutside);

    if (isOpenModal) {
      const timeoutId = setTimeout(() => {
        setIsOpenModal(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpenModal, setIsOpenModal]);

  return (
    <div ref={modalRef} className="absolute z-20 ml-[60%]">
      {isOpenModal && (
        <div className="border-yellow-400 rounded-lg shadow-yellow-3xl flex items-center bg-main-white">
          <div className="w-[465px] h-[126px] flex justify-center items-center">
            <p className="text-center w-[355px] font-sans text-2xl leading-normal p-2.5">
              Скопійовано! Посилання активне 3 хвилини
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
"use client";

import { useState, useEffect, FC } from "react";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import restart from "../../../../public/icon/restart-arrow.svg"

export const Timer: FC<{ className: string }> = ({className}) => {
  const initialTime = 10 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false); 

  useEffect(() => {
    let timerId;
    if (isActive && time > 0) { 
      timerId = setTimeout(() => setTime(time - 1), 1000);
    }
    return () => clearTimeout(timerId); 
  }, [time, isActive]); 

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex">
       <h2 className={`text-center text-2xl mr-3.5 pointer ${pressStart2p.className} ${className}`}>
        {minutes.toString().padStart(2, "0")}:
        <span className={isActive ? "text-error-color" : ""}> 
          {seconds.toString().padStart(2, "0")}
        </span>
      </h2>
      <button  
      onClick={() => {
        setTime(initialTime); 
        setIsActive(true); 
      }}
      className="w-8 h-8 rounded-lg  bg-main-yellow items-center">
      <Image
      src={restart}
      alt="restart"
      width={19}
      height={19}
      className="ml-auto mr-auto"
    />
      </button>
    </div>
  );
}
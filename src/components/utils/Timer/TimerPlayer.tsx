"use client";

import React, { FC, useState, useEffect } from "react";
import { pressStart2p } from "@/app/[lang]/fonts";
import { useTimerStore } from "./TimerContext";

export const TimerPlayer: FC<{ className: string }> = ({ className }) => {
 const initialTime = 1 * 60; ;
 const [time, setTime] = useState(initialTime);
 const [isActive, setIsActive] = useState(false);

  useEffect(() => {
     let timerId: NodeJS.Timeout;

     if (isActive && time > 0) {
       timerId = setTimeout(() => setTime(time - 1), 1000);
     }

     return () => clearTimeout(timerId);
   }, [time, isActive]);

   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

   return (
     <div className="flex">
       <h2 className={`${pressStart2p.className} ${className}`}>
         {minutes.toString().padStart(2, "0")}:
         <span className={isActive ? "text-error-color" : ""}> 
           {seconds.toString().padStart(2, "0")}
         </span>
       </h2>
     </div>
   );
 };

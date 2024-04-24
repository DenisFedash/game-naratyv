"use client";

import { useState, useEffect, FC } from "react";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import restart from "../../../../public/icon/restart-arrow.svg";
import { getGameSession } from "@/app/(server)/api/game-session/data";
import { useTeamsStore } from "@/components/RulesComponent/TeamsContext";
import { useTimerStore } from "./TimerContext";


export const Timer: FC<{ className: string }> = ({className}) => {
  const {time, setTime} = useTimerStore();
  const initialTime = 5;
  // const initialTime = 1 * 60; 
  const [isActive, setIsActive] = useState(false); 
  // const [players, setPlayers] = useState<Player[]>([]);
  const { sessionIdentificator, players, setPlayers, setServerMessage } = useTeamsStore();

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isActive && time > 0) {
      timerId = setTimeout(() => setTime(time - 1), 1000);
    } else if (time === 0) {
      getGameSession(sessionIdentificator)
        .then(responseData => {
          console.log("Session data:", responseData);
          console.log("Lobby data:", responseData.data);
          setPlayers(responseData.data); 
        })
        .catch(error => {
          console.error(error);
          setServerMessage(error.message);
        });
    }

    return () => clearTimeout(timerId);
  }, [time, isActive, sessionIdentificator]);

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
        <button  
        className="w-8 h-8 rounded-lg  bg-main-yellow items-center">
        <Image
        src={restart}
        alt="restart"
        width={19}
        height={19}
        className="ml-auto mr-auto"
        onClick={() => {
          setTime(initialTime); 
          setIsActive(true); 
        }}
      />
       </button>     
    </div>
  );
}
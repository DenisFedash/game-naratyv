"use client"

import { FC, useRef } from "react";
import { GameTopicProps } from "@/interfaces/Props.interface";
import { GameTopic } from "./GameTopicComponent";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export const DropdownList:FC<GameTopicProps> = ({ isOpen, setIsOpen, onTopicSelect, lang }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [gameTopics, setGameTopics] = useState([
    "Будинок з привидами на пагорбі",
    "Руїни давнього замку біля озера",
    "Хатинка в глухому лісі в сутінках"
  ]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const addGameTopic = (newTopic: string) => {
    if (newTopic !== "") {
      setGameTopics([newTopic, ...gameTopics]);
    }
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    if (onTopicSelect) {
      onTopicSelect(topic);
    }
    setIsOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref?.current && !ref.current.contains(event.target)) {
        setIsOpenFirst(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return isOpen ? (
    <div ref={ref} className="absolute z-10 ml-[75px]">
      <div >
        <div className="h-[200px] rounded-lg w-[299px] border px-2.5 py-2.5  bg-main-white" onMouseEnter={() => setIsOpenFirst(true)} onMouseLeave={() => setIsOpenFirst(false)}>
          <button onMouseEnter={() => setIsOpenFirst(true)} className="flex rounded-lg w-[279px] h-[60px] items-center text-start px-5 pt-[14px] pb-[14px] text-3xl hover:bg-icon-move-color">
            Обрати тему
          </button>
          <Link href="/ua/rules/naratyv-creatyv"> 
          <button className="flex rounded-lg w-[279px] h-[60px] items-center text-start px-5 pt-[14px] pb-[14px] text-3xl hover:bg-icon-move-color">
           Скасувати гру
          </button>
          </Link>
          {isOpenFirst && (
           <div className="absolute z-10 py-2.5 ml-[300px] border rounded-lg w-[592px] bg-main-white mt-[-130px] overflow-y-auto max-h-[460px]" onMouseLeave={() => setIsOpenFirst(false)}>
           <GameTopic gameTopics={gameTopics} addGameTopic={addGameTopic} onTopicClick={handleTopicClick}/>
       </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

DropdownList.displayName = "DropdownList";
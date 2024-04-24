"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import { GameTopicListProps } from "@/interfaces/Props.interface";

export const GameTopic:FC<GameTopicListProps & { handleAddGameTopic: () => void; 
  inputRef: RefObject<HTMLInputElement>; }> = ({ 
    gameTopics, addGameTopic, onTopicClick, handleAddGameTopic, inputRef }) => {
  const listRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(true); 

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        handleAddGameTopic();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddClick = () => {
    handleAddGameTopic();
    setIsOpen(false); 
    inputRef.current?.focus(); 
  };

  if (!isOpen) return null;

  return (
    <>
      <ul className="flex flex-col items-center justify-center px-2.5 rounded-lg">
        {gameTopics.map((topic, index) => (
          <li
            key={index}
            className="flex flex-col items-start justify-center w-[532px] mb-[12px] px-5 h-[60px] hover:bg-icon-move-color rounded-lg cursor-pointer"
            onClick={() => onTopicClick(topic)}
          >
            <p className="text-start text-3xl">{topic}</p>
          </li>
        ))}
        <button
          onClick={handleAddGameTopic}
          className="items-center w-[532px] mb-[12px] h-[60px] hover:bg-icon-move-color rounded-lg text-start text-3xl px-2.5 flex flex-row"
        >
          <span className="text-4xl pl-1.5 mr-1.5">+ </span> Створити свою тему
        </button>
      </ul>
    </>
  );
};
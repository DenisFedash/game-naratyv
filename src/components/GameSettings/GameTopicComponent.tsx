"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import { GameTopicComponentProps } from "@/interfaces/Props.interface";

export const GameTopic:FC<GameTopicComponentProps> = ({ gameTopics, addGameTopic, onTopicClick }) => {
  const [newTopic, setNewTopic] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        handleAddGameTopic(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddGameTopic = () => {
    addGameTopic(newTopic);
    setNewTopic("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleAddGameTopic();
    }
  };

  return (
    <>
      <ul className="flex flex-col items-center justify-center px-2.5 rounded-lg ">
        {gameTopics.map((topic, index) => (
          <li key={index} className="flex flex-col items-start justify-center w-[532px] mb-[12px] px-5 h-[60px] hover:bg-icon-move-color rounded-lg cursor-pointer" onClick={() => onTopicClick(topic)}>
            <p className="text-start text-3xl">{topic}</p>
          </li>   
        ))}
        <button onClick={handleAddGameTopic} className="items-center w-[532px] mb-[12px] h-[60px] hover:bg-icon-move-color rounded-lg text-start text-3xl px-2.5 flex flex-row"><span className="text-4xl pl-1.5 mr-1.5">+ </span> Створити свою тему</button>
        <input 
        ref={inputRef} 
        type="text" 
        maxLength={27} 
        value={newTopic} 
        onChange={(e) => setNewTopic(e.target.value)} 
        onKeyDown={handleKeyDown} className="focus:outline-none focus:ring-0 w-[532px] mb-[12px] px-2.5 h-[60px] focus:bg-icon-move-color rounded-lg" />
      </ul>
    </>
  )
}
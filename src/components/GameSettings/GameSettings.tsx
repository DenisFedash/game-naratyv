"use client"

import React, { useState, useEffect, useRef, FC } from 'react';
import { GameTopicProps } from "@/interfaces/Props.interface";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import Link from "next/link";
import { Timer } from "../utils/Timer/Timer";
import copyBtn from "../../../public/icon/copy-document.svg";
import { ListBtn } from "./ListBtn";
import { DropdownList } from "./DropdownList";
import { Modal } from "./Modal";
import { CreateMeet } from "./CreateMeet";
import { useTeamsStore } from "../RulesComponent/TeamsContext";
import { useTimerStore } from "../utils/Timer/TimerContext";

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API


export const GameSettings:FC<GameTopicProps> = ({textTr, lang, id }) => { 
  const { time } = useTimerStore();
  const dropdownRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newTopic, setNewTopic] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false); 
  const [teams, setTeams] = useState<string[]>([]);

  const { sessionIdentificator, setSessionIdentificator, players, serverMessage, setServerMessage } = useTeamsStore();
  console.log("ідентифікатор:", sessionIdentificator);
  console.log("команда:", players)

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setIsOpen(false);
  };

  const handleAddGameTopic = () => {
    addGameTopic(newTopic);
    setNewTopic("");
    setIsOpen(false); 
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleAddGameTopic();
    }
  };
    
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/ua/game-start/naratyv-creatyv/player?sessionIdentificator=${sessionIdentificator}`);
  };


  return (
    <>
    <div className="flex flex-col h-[790px] py-6">
        <div className="layout relative flex py-8 items-start justify-between">
        <div className="flex ">
          <ListBtn setIsOpen={setIsOpen}/> 
          <div className="absolute">
           <DropdownList 
           ref={dropdownRef} 
           isOpen={isOpen} 
           setIsOpen={setIsOpen} 
           onTopicSelect={handleTopicSelect} 
           handleAddGameTopic={handleAddGameTopic} 
           inputRef={inputRef}/> 
          </div>
          </div>
            <div className="relative w-full flex flex-col justify-center items-center">
        <h2 className={`text-center text-3xl mb-9 ${pressStart2p.className}`}>
            {textTr?.gameSettingsTitle}   
          </h2>      
          <div 
          className="relative bg-main-white border border-main-font-color rounded-lg shadow-3xl font-bold flex items-center justify-end h-16 focus:outline-none transform transition-transform duration-200 ease-in-out active:scale-90 mb-10">
      <div 
      className="flex flex-row justify-center items-center w-[390px] h-16 border-r-2 border-gray-300">
 <p className="text-xl text-center">
  {setSessionIdentificator ? 
  `www.CoLABnaratyv-creatyv/${sessionIdentificator}`
  //  : textTr?.linkGame}
  : ""}
</p>
      </div> 
      <div onClick={() => setIsOpenModal(true)} className="border relative items-end w-[84px] h-16 bg-main-yellow p-2.5 rounded-r-lg cursor-pointer">
        <Image
          src={copyBtn}
          alt="copy-button"
          width={48}
          height={48}
          className="w-12 h-12 ml-auto mr-auto"
          onClick={handleCopy}/>
      </div>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}/>
    </div>
      {/* <CreateMeet/>  */}
     <input
        placeholder={selectedTopic || textTr?.topic}
        ref={inputRef}
        type="text"
        maxLength={37}
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none w-full text-4xl font-bold placeholder-main-font-color placeholder={selectedTopic || textTr?.topic} text-center mb-9 bg-main-background"
      />
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-2xl mb-3.5">{textTr.timer}</p> 
          <Timer className={`mb-2 text-center text-2xl mr-3.5 pointer`}/> 
          <div className="flex items-center justify-center text-center w-40 h-8 bg-main-white rounded-lg">
            <p className="text-xs text-dark-grey">{textTr.restartTimer}</p>
          </div>
          </div> 
      </div> 
        </div>
         <div className="layout flex flex-row items-end">
        <ul className="layout flex w-full justify-center">
        {players ? (
    players.map((player) => (
        <li key={player.player_uuid}>
          Команда
          <p className="text-center text-3xl">{player.username}</p>
          </li>
            ))
             ) : (
              <p className="text-center text-3xl">{serverMessage}</p>
    )}
     </ul>   
         <button 
            className={`border w-[280px] h-12 rounded-lg shadow-3xl ml-auto mr-auto text-2xl font-bold 
            ${
              time > 0
                ? " bg-main-white bg-gray-500 font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                : "hover:bg-orange bg-main-yellow"
            }`}
            disabled={time > 0}> 
            Грати
            </button>   
            </div>   
        </>
    )
}


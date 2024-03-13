"use client"

import { pressStart2p } from "@/app/[lang]/fonts";
import { Timer } from "../utils/Timer/Timer";
import Image from "next/image";
import Link from "next/link";
import copyBtn from "../../../public/icon/copy-document.svg";
import { ListBtn } from "./ListBtn";
import { DropdownList } from "./DropdownList";
import React, { useState, useRef, FC } from 'react';
import { GameTopicProps } from "@/interfaces/Props.interface";
import { Modal } from "./Modal";


export const GameSettings:FC<GameTopicProps> = ({textTr, lang, id }) => { 
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false); 
  const [hovered, setHovered] = useState(false);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };
    
  const handleCopy = () => {
      navigator.clipboard.writeText("http://localhost:3000/ua/rules/naratyv-creatyv/player");
    };

  return (
    <div className="flex flex-col h-[790px]">
        <div className="layout relative flex py-8 items-start">
        <div className="flex ">
          <ListBtn setIsOpen={setIsOpen}/> 
          <div className="absolute ml-[80px]">
           <DropdownList ref={dropdownRef} isOpen={isOpen} onTopicSelect={handleTopicSelect}/> 
          </div>
          </div>
            <div className="mr-[92px] relative flex flex-col justify-center items-center">
        <h2 className={`text-center text-3xl mb-9 ${pressStart2p.className}`}>
            {textTr.gameSettingsTitle}   
          </h2>      
          <div 
          className="relative bg-main-white border border-main-font-color rounded-lg shadow-3xl font-bold flex items-center justify-end w-[512px] h-16 focus:outline-none transform transition-transform duration-200 ease-in-out active:scale-90 mb-10">
      <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} 
      className="flex flex-row justify-center items-center  w-[382px] h-16 border-r-2 border-gray-300">
        <p className="text-2xl">
        {hovered ? <Link href={`/${lang}/rules/${id}/player`}>http://rules/player</Link> : textTr.linkGame}
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
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-2xl mb-3.5">{textTr.timer}</p>
          <Timer className={`mb-2`}/>
          <div className="flex items-center justify-center text-center w-40 h-8 bg-main-white rounded-lg">
            <p className="text-xs text-dark-grey">{textTr.restartTimer}</p>
          </div>
          </div>
          <div>
      </div>
        </div>
   
        {/* <CreateMeet/> */}
 
        <h3 className="text-4xl font-bold text-center mb-9">{selectedTopic || textTr.topic}</h3>
        <div className="flex justify-between w-[632px] ml-auto mr-auto">
          <div>
        <h4 className="text-3xl font-bold">{textTr.team}</h4>
        </div>
        <div>
        <h4 className="text-3xl font-bold">{textTr.team1}</h4>
        </div>
        </div>
        </div>
    )
}


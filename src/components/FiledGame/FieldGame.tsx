"use client";
import React, { useState } from "react";
import dataTeam from "../../../public/data/teamPlayers.json";
import Image from "next/image";
import { pressStart2p } from "@/app/[lang]/fonts";
import iconBrash from "../../../public/icons/icon-eraser.svg";
import iconPen from "../../../public/icons/icon-pen.svg";
import iconFigures from "../../../public/icons/icon-figures.svg";
import iconBg from "../../../public/icons/icon-background.svg";
import iconBack from "../../../public/icons/icon-back.svg";
import iconFwd from "../../../public/icons/icon-fwd.svg";
import iconFile from "../../../public/icons/icon-file.svg";
import { ColorPicker } from "../ColorPicker/ColorPicker";

export const FieldGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="layout">
      <ul className="flex items-center justify-end my-11">
        {dataTeam.map(({ id, name, icon }, index) => (
          <li
            key={id}
            className="-mr-5 last:mr-0"
            style={{ zIndex: dataTeam.length - index }}
          >
            <Image
              src={icon}
              alt="icon"
              width="0"
              height="0"
              className="w-[54px] h-auto"
            />
          </li>
        ))}
      </ul>
      <h1 className={`text-center text-3xl mb-4 ${pressStart2p.className}`}>
        Назва команди
      </h1>
      <p className="text-3xl text-center mb-6 ">Назва гри</p>
      <div className="flex items-center">
        <div className="w-[89px] h-[520px] bg-dark-grey rounded-lg py-5 px-[20.5px] mr-4">
          <Image
            src={iconBrash}
            alt="brash"
            width="0"
            height="0"
            className="mb-24 w-12 h-auto"
          />
          <div
            className="cursor-pointer relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src={iconPen}
              alt="pen"
              width="0"
              height="0"
              className="mb-24 w-12 h-auto"
            />
            <div className={isOpen ? "absolute -top-6 left-16" : "hidden"}>
              <ColorPicker
                setIsOpen={setIsOpen}
                onColorSelect={(color) => {
                  handleColorSelect(color);
                }}
              />
            </div>
          </div>

          <Image
            src={iconFigures}
            alt="figures"
            width="0"
            height="0"
            className="mb-24 w-12 h-auto"
          />
          <Image
            src={iconBg}
            alt="background"
            width="0"
            height="0"
            className="w-12 h-auto"
          />
        </div>
        <div>
          <div className=" bg-main-white flex items-center justify-between h-[66px] shadow-panel-shadow mb-2">
            <div className="flex items-center p-4 mr-[90px]">
              <div className=" bg-main-grey rounded-lg px-2.5 py-1 mr-5">
                <Image
                  src={iconBack}
                  alt="icon-back"
                  width="0"
                  height="0"
                  className="w-6 h-auto"
                />
              </div>
              <div className=" rounded-lg px-2.5 py-1 mr-5">
                <Image
                  src={iconFwd}
                  alt="icon-fwd"
                  width="0"
                  height="0"
                  className="w-6 h-auto"
                />
              </div>
            </div>
            <div className=" border-x border-main-grey w-[512px] px-6 h-full py-3.5 mr-[90px]">
              <input
                type="text"
                placeholder="Посилання на meet"
                className=" text-3xl outline-none w-full"
              />
            </div>
            <div className="border-x border-main-grey h-full py-3.5 px-6 mr-[90px]">
              <Image
                src={iconFile}
                alt="icon-file"
                width="0"
                height="0"
                className="w-11 h-auto border-none"
              />
            </div>
            <div className="py-1.5 pr-4">
              <div className="text-5xl text-dark-grey">00:00</div>
            </div>
          </div>
          <div>
            <canvas
              width={1172}
              height={448}
              className=" bg-main-white border border-dark-grey"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

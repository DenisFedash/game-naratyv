import { pressStart2p } from "@/app/[lang]/fonts";
import { GameCardProps } from "@/interfaces/Props.interface";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

export const GameCard: FC<GameCardProps> = ({ lang, textTr, gameData }) => {
  return (
    <div className="keen-slider__slide relative bg-main-white px-3 py-2 md:p-6 rounded md:rounded-lg">
      <div
        className={`${
          !gameData.isActive ? "pointer-events-none opacity-50" : ""
        }`}>
        <Image
          src={gameData.img}
          alt="game-logo"
          width={324}
          height={203}
          className="mb-4 md:mb-8 rounded md:rounded-lg md:w-full"
          priority={true}
        />
        <div className="flex items-center mb-9 md:mb-6">
          <Image
            src={gameData.icon}
            alt="icon-game"
            width={26}
            height={17}
            className="mr-2.5 lg:mr-3 md:w-[38px] md:h-[25px]"
            priority={true}
          />
          <h2
            className={`text-base md:text-3xl font-bold ${pressStart2p.className}`}>
            {lang === "ua" ? gameData.nameUa : gameData.nameEn}
          </h2>
        </div>
        <p className="text-base md:text-2xl text-justify lg:hidden mb-3.5 md:mb-6">
          {lang === "ua" ? gameData.descriptionUa : gameData.descriptionEn}
        </p>
        <div className="lg:flex lg:justify-between lg:items-center">
          <div>
            <p
              className={`text-xs md:text-2xl pl-10 ${pressStart2p.className}`}>
              {gameData.stat}
            </p>
            <div className="flex items-center">
              <Image
                src={gameData.iconLike}
                alt="icon-like"
                width={18}
                height={18}
                className="mr-2 lg:mr-2.5 md:w-6 md:h-6"
              />
              <p className="text-xs md:text-lg">{textTr.like}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Link href={`/${lang}`}>
              <div
                className={`hidden rounded-lg shadow-3xl lg:w-[280px] text-center text-2xl py-5 font-bold hover:bg-orange ${
                  !gameData.isActive ? "bg-main-white border" : "bg-main-yellow"
                }`}>
                {textTr.gameBtn}
              </div>
            </Link>
            <p className="font-bold text-base md:text-2xl text-right text-orange lg:hidden">
              {textTr.pcGameMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

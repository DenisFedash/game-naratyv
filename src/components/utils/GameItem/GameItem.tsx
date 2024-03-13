import { GameCardProps } from "@/interfaces/Props.interface";
import React from "react";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import Link from "next/link";

const GameItem = ({ lang, textTr, gameData }: GameCardProps) => {
  const {
    id,
    img,
    icon,
    iconLike,
    nameUa,
    nameEn,
    stat,
    descriptionUa,
    descriptionEn,
    isActive,
  } = gameData;
  return (
    <li
      key={id}
      className={`flex p-6 mb-14 bg-main-white ${
        !isActive ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <div className="mr-7">
        <Image
          src={img}
          alt="image"
          width={551}
          height={381}
          className="max-w-none rounded-lg"
        />
      </div>
      <div>
        <div className="mb-24">
          <div className="flex items-center mb-6">
            <Image
              src={icon}
              alt="icon"
              width={44}
              height={44}
              className="mr-2.5"
            />
            <h2 className="text-3xl font-bold">
              {lang === "ua" ? nameUa : nameEn}
            </h2>
          </div>
          <p className="text-2xl text-justify">
            {lang === "ua" ? descriptionUa : descriptionEn}
          </p>
        </div>
        <div className="flex justify-between items-center pb-6">
          <div>
            <p className={`text-2xl pl-10 ${pressStart2p.className}`}>{stat}</p>
            <div className="flex items-center">
              <Image
                src={iconLike}
                alt="icon-like"
                width={24}
                height={24}
                className="mr-2.5"
              />
              <p>{textTr.like}</p>
            </div>
          </div>
          <Link href={`/${lang}/rules/${id}`}>
            <div
              className={`rounded-lg shadow-3xl w-[280px] text-center text-2xl py-5 font-bold hover:bg-orange focus:outline-none transform transition-transform duration-200 ease-in-out active:scale-90 ${
                !isActive ? "bg-main-white border" : "bg-main-yellow"
              }`}
            >
              {textTr.gameBtn}
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default GameItem;

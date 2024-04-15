import { FC } from "react";
import { GameComponentProps } from "@/interfaces/Props.interface";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import data from "../../../public/data/dataGames.json";
import defaultIcon from "../../../public/icon/team-game.svg";

export const GameComponent: FC<GameComponentProps> = ({ lang, id }) => {
  const rules = data.find((item) => item.id === id);

  if (!rules) {
    return <div>Гра не знайдена</div>;
  }

  return (
    <div className="layout w-screen">
          <div key={rules.id} className="flex justify-between pt-24">
          <Image
            src={rules.img} 
            alt={lang === "ua" ? rules.nameUa : rules.nameEn} 
            width={430}
            height={430} 
         className="w-[430px]" />
          <div className="w-[900px]">
                <div className="flex mb-6 items-center">
              <Image
                alt="team-game"
                // src={rules.icon || defaultIcon} 
                src={defaultIcon} 
                width={44}
                height={44}
                className="mr-7"
              />
              <h2 className={`text-3xl ${pressStart2p.className}`}>
                {lang === "ua" ? rules.nameUa : rules.nameEn}
              </h2>
              </div>
            <p className="text-3xl mb-6 text-justify">
              {lang === "ua" ? rules.descriptionDetailsUa : rules.descriptionDetailsEn}
            </p>
            <p className="text-3xl text-justify"> {lang === "ua" ? rules.descriptionDetailsTextUa : rules.descriptionDetailsTextEn}</p>
            </div>
      </div> 
      </div>
  );
};
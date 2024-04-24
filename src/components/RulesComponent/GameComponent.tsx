import { FC } from "react";
import { GameComponentProps } from "@/interfaces/Props.interface";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import defaultIcon from "../../../public/icon/team-game.svg";
import defaultImg from "../../../public/img/naratyv-desc.jpg"
import { getGame } from "@/app/(server)/api/game/data";

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API


export const GameComponent: FC<GameComponentProps> = async ({ lang }) => {
  const rules = await getGame();

  if (!rules) {
    return <div>Not Found</div>;
  }

  return (
    <div className="layout w-screen">
          <div key={rules.uuid} className="flex justify-between pt-24">
          <Image
            src={`http://localhost:80/api/v1/${rules.photo}` || defaultImg} 
            alt={lang === "ua" ? rules.name_ua : rules.name_en} 
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
                {lang === "ua" ? rules.name_ua : rules.name_en}
              </h2>
              </div>
            <p className="text-3xl mb-6 text-justify">
              {lang === "ua" ? rules.description_ua : rules.description_en}
            </p>
            <p className="text-3xl text-justify"> {lang === "ua" ? rules.descriptionDetailsTextUa : rules.descriptionDetailsTextEn}</p>
            </div>
      </div> 
      </div>
  );
};
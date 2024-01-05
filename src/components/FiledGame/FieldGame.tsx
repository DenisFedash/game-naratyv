import React from "react";
import dataTeam from "../../../public/data/teamPlayers.json";
import Image from "next/image";
import { pressStart2p } from "@/app/[lang]/fonts";

export const FieldGame = () => {
  return (
    <div className="layout">
      <ul className="flex items-center justify-end my-11">
        {dataTeam.map(({ id, name, icon }, index) => (
          <li
            key={id}
            className="-mr-5 last:mr-0"
            style={{ zIndex: dataTeam.length - index }}
          >
            <Image src={icon} alt="icon" width={54} height={54} />
          </li>
        ))}
      </ul>
      <h1 className={`text-center text-3xl mb-4 ${pressStart2p.className}`}>
        Назва команди
      </h1>
      <p className="text-3xl text-center mb-6">Назва гри</p>
      <div></div>
    </div>
  );
};

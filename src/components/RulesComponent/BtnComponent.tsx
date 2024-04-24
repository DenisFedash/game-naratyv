 "use client";

import { useState, FC } from "react";
import { RulesBtnProps } from "@/interfaces/Props.interface";
import Link from "next/link";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";
import { NumberOfTeams } from "./RadioBtnNumberOfTeams";
import { useTeamsStore } from "./TeamsContext";


export const BtnComponent: FC<RulesBtnProps> = ({ textTr, lang, id }) =>  {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedValue, setSelectedValue } = useTeamsStore();


  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative flex layout justify-between mt-20">
        <Link href={`/${lang}/rules/naratyv-creatyv/player`}>
          <button className="border w-[343px] rounded-lg shadow-3xl h-[84px] text-center text-3xl font-bold bg-main-white hover:bg-orange">
            {textTr.rulesBtnUser}
          </button>
        </Link>
        <Link href={`/${lang}/rules/naratyv-creatyv/admin`}>
          <button className="border w-[343px] rounded-lg shadow-3xl h-[84px] text-center text-3xl bg-main-white font-bold hover:bg-orange">
            {textTr.rulesBtnAdmin}
          </button>
         </Link>
          <div  onClick={toggleForm}>
        <SecondBtn    
        className="relative bg-main-white cursor-pointer">
          {textTr.createGameBtn}
        </SecondBtn>
        </div>
      </div>
      {isOpen && <NumberOfTeams selectedValue={selectedValue} setSelectedValue={setSelectedValue} />}
    </>
  );
};





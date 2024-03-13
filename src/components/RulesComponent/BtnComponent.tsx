// "use client";

import { FC } from "react";
import { RulesBtnProps } from "@/interfaces/Props.interface";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";
import { RulesDetailed } from "./RulesDetailed ";


export const BtnComponent: FC<RulesBtnProps> = async ({ textTr, lang, id }) =>  {
  // const router = useRouter();

  // const handleButtonClick = (path) => {
  //   router.push(path);
  // };

  return (
    <>
      <div className="flex layout justify-between mt-20">
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
        <Link href={`/${lang}/create-game`}>
        <SecondBtn className="bg-main-white">
          {textTr.createGameBtn}
        </SecondBtn>
        </Link>
      </div>
      <RulesDetailed textTr={textTr} lang={lang} role={"details"} /> 
    </>
  );
};





import { FC } from "react";
import { RulesComponentProps } from "@/interfaces/Props.interface";
import { pressStart2p } from "@/app/[lang]/fonts";
import Link from "next/link";
import { RuleNumber } from "../utils/RuleCard/RuleNumber";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";
import { getAllRules } from "@/app/(server)/api/rules/data";
import { BtnGoBackComponent } from "../utils/BtnGoBack/BtnGoBackComponent";

export const RulesAdmin: FC<RulesComponentProps> = async ({ textTr, lang, role }) => {
    const rules = await getAllRules();
    const rulesByRole = rules.filter((item) => item.role === role); 
    if (!rulesByRole.length) {
      return <div>Правило не знайдено {role}</div>;
    }
    
    return (
      <div className="h-full items-center text-center">
        <div className="layout mb-14 mt-24 items-center">
        <Link href={`/${lang}/create-game`}>
          <SecondBtn btnWidth="w-[550px]" className="flex items-center mb-24 text-4xl font-bold text-main-grey bg-main-white ml-auto mr-auto">
            {textTr.createGameBtn} 
          </SecondBtn> 
          </Link>  
          <h2 className={`text-center text-3xl mb-9 ${pressStart2p.className}`}>
            {textTr.ruleAdminTitle}   
          </h2>
        </div>
        <h2 className={`text-3xl mb-9 ${pressStart2p.className}`}>
           {textTr.rulePlayerTitle}
        </h2>
          <div  className="w-[1020px] text-justify layout">
            <div className="items-start">
            <p className="text-3xl mb-24 text-justify">
              {lang === "ua" ? JSON.stringify(rulesByRole[0].descriptionUa) : JSON.stringify(rulesByRole[0].descriptionEn)}
               </p>
             </div>
             <h2 className={`text-center text-3xl mb-16 ${pressStart2p.className}`}>
              {textTr.ruleAdminTitleCreateGame}  
            </h2> 
            </div>
            {rulesByRole.map((rule) =>  (
            <div key={role} className="layout flex text-justify mb-20">
              <RuleNumber className="items-center w-16 h-16 pl-2"><p className={`text-3xl ${pressStart2p.className}`}>{rule.num}</p></RuleNumber>
              <p className="ml-6 text-3xl text-justify">
                <strong>{lang === "ua" ? rule.rulesUa.rule : rule.rulesEn.rule}</strong>{lang === "ua" ? rule.rulesUa.rule1 : rule.rulesEn.rule1} 
              </p>  
              
            </div> 
        ))}
         <BtnGoBackComponent textTr={textTr} lang={lang} className="w-[466px] mb-24">{textTr.ruleBtnGoBack}</BtnGoBackComponent>
      
      </div>
    );
  };
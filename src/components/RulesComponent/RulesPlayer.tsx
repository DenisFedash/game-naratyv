import { RulesComponentProps } from "@/interfaces/Props.interface";
import { FC } from "react";
import { pressStart2p } from "@/app/[lang]/fonts";
import { RuleCard } from "../utils/RuleCard/RuleCard";
import { RuleNumber } from "../utils/RuleCard/RuleNumber";
import { getAllRules } from "@/app/(server)/api/rules/data";
import { BtnGoBackComponent } from "../utils/BtnGoBack/BtnGoBackComponent";
import { AddNicknameInput } from "./AddNicknameInput";


export const RulesPlayer: FC<RulesComponentProps> = async ({ textTr, lang, role }) => {
  const rules =  await getAllRules();
  const rulesByRole: any[] = rules.filter((rule: any) => rule.role === role);
  console.log(role); 

  if (!rulesByRole.length) {
    return <div>Не знайдено {role}</div>;
  }
  
  return (
    <>
   <div className="layout flex flex-col h-full items-center">
      <div className="mb-14 mt-24 text-center">
         <h2 className={`text-3xl mb-9 ${pressStart2p.className}`}>
        {textTr.rulePlayerStartGame}
        </h2>
        <p className="text-3xl mb-9"> {textTr.rulePlayerStartGameText}</p>
        <AddNicknameInput textTr={textTr} lang={lang} />  
        <h2 className={`text-3xl mb-9 mt-24 ${pressStart2p.className}`}>
           {textTr.rulePlayerTitle}
        </h2>
      </div>
      <div className=" w-[1020px] items-center">
      <RuleCard className="w-[1020px] h-60 mb-24 justify-center items-start bg-main-white">
        <ul className="mb-14 text-justify">
          <li className="list-disc text-3xl text-justify">{lang === "ua" ? rulesByRole[0].descriptionUa.description1 : rulesByRole[0].descriptionEn.description1}</li>
          <li className="list-disc text-3xl text-justify">{lang === "ua" ? rulesByRole[0].descriptionUa.description2 : rulesByRole[0].descriptionEn.description2}</li>
          <li className="list-disc text-3xl text-justify">{lang === "ua" ? rulesByRole[0].descriptionUa.description3 : rulesByRole[0].descriptionEn.description3}</li> 
        </ul>     
      </RuleCard>
      </div>
      {rulesByRole.map((rule) => ( 
        <div key={rule.role} className=" flex flex-col items-center w-[1020px] ">
          <div className="flex flex-row items-center mb-20 text-justify">
            <RuleNumber className="items-center w-16 h-16 pl-2"><p className={`text-3xl ${pressStart2p.className}`}>{rule.num}</p></RuleNumber>
            <p className="w-[922px] ml-6 text-3xl text-justify">
              <strong>{lang === "ua" ? rule.rulesUa.rule : rule.rulesEn.rule}</strong>{lang === "ua" ? rule.rulesUa.rule1 : rule.rulesEn.rule1} 
            </p> 
          </div>
        </div>
      ))}
        <h2 className={`text-3xl ${pressStart2p.className} mb-14 ml-[366px]`}>{textTr.ruleEthics}</h2>
        <div className="flex flex-col w-[1020px] mb-28"> 
        <p className="text-justify text-3xl">{textTr.ruleEthics1}</p> 
        <p className="text-justify text-3xl">{textTr.ruleEthics2}</p>
        <p className="text-justify text-3xl">{textTr.ruleEthics3}</p>   
         </div>     
      <div className="justify-start mb-28 text-justify">
       <BtnGoBackComponent textTr={textTr} lang={lang} className="w-[466px]">{textTr.ruleBtnGoBack}</BtnGoBackComponent>
       </div>
       </div>
      </>
)};
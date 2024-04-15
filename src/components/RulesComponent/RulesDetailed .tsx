import { FC } from "react";
import { TextFCComponentsProps } from "@/interfaces/Props.interface";
import Image from "next/image";
import Link from "next/link";
import { pressStart2p } from "@/app/[lang]/fonts";
import { RuleCard } from "../utils/RuleCard/RuleCard";
import { RuleNumber } from "../utils/RuleCard/RuleNumber";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";
import { GallerySlider } from "./GallerySlider";
import { getAllRules } from "@/app/(server)/api/rules/data";
import { getAllGallery } from "@/app/(server)/api/gallery/data";
import defaultImage from "../../../public/img/default-image.png";


export const RulesDetailed: FC<TextFCComponentsProps> = async({ textTr, lang, role, id }) => {
  const gallery = await getAllGallery();
  const rules = await getAllRules();
  console.log(rules)
  const rulesByRole = rules.filter((item) => item.role === role);
  
  if (!rulesByRole.length) {
    return <div>Not found {role}</div>;
  }

  return (
    <div className="layout h-full ">
      <div className="mb-24 mt-24 justify-center text-center">
        <h2 className={`text-3xl ${pressStart2p.className}`}>
          {textTr.ruleDetailsTitle}
        </h2>
      </div>
      {rulesByRole.map((rule, index) => (
        <>
          <RuleCard className={`relative w-[1020px] h-36 bg-main-white pl-[82px] text-justify ${index % 2 !== 0 ? "ml-[260px]" : ""}`}>
            <p className="text-2xl text-justify pr-3">
              <strong>
                {lang === "ua" ? rule.rulesUa.rule : rule.rulesEn.rule}
              </strong>
              {lang === "ua" ? rule.rulesUa.rule1 : rule.rulesEn.rule1}
            </p>
          </RuleCard>
          <RuleNumber className={`absolute w-16 h-16 mt-[-135px] items-center pl-2 ${index % 2 !== 0 ? "ml-[260px]" : ""}`}>
            <p className={`text-3xl ${pressStart2p.className}`}>{rule.num}</p>
          </RuleNumber>
          {index !== rulesByRole.length - 1 && (
      <Image
        src={defaultImage}
        alt="arrow"
        width={112}
        height={94}
        className={`ml-[1020px] ${index % 2 !== 0 ? "ml-[130px] transform scale-x-[1]" : "transform scale-x-[-1]"}`}
      />
    )}
  </>
))}
    
      <div className="text-center mt-28">
      <Link href={`/${lang}/catalog`}>
      <button className="placeholder:border w-[466px] rounded-lg shadow-3xl h-[84px] ml-auto mr-auto text-3xl font-bold hover:bg-orange bg-main-yellow">{textTr.btnCatalog}</button>
      </Link>
      <h2 className={`text-3xl mt-28 mb-12 ${pressStart2p.className}`}>
          {textTr.community}
        </h2>
        </div>
        <GallerySlider textTr={textTr} lang={lang} data={gallery} id={id}/>  
      <Link href={`/${lang}/gallery`}>
        <SecondBtn className="mt-12 mb-28 bg-main-white ml-auto mr-auto">{textTr.galleryBtn}</SecondBtn>
      </Link>
    </div>
  );
};


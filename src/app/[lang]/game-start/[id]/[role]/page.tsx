import { FC } from "react";
import { RulesComponentProps } from "@/interfaces/Props.interface";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getAllRules } from "@/app/(server)/api/rules/data";
// import rules from "../../../../../../public/data/dataRules.json";
import data from "../../../../../../public/data/dataGames.json";
import { RulesActivePlayer } from "@/components/RulesComponent/RulesActivePlayer";
import { RulesAdmin } from "@/components/RulesComponent/RulesAdmin";
import { GameComponent } from "@/components/RulesComponent/GameComponent";
import { TimerPlayer } from "@/components/utils/Timer/TimerPlayer"
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";


export const generateStaticParams = async () => {
  const rules = await getAllRules();
  return rules.map((rule) => (
    data.map((game) => ({
      params: { role: rule.role, id: game.id }
    }))
  )).flat();
};

const RolePage:FC<RulesComponentProps> = async ({ params: { lang, role, id } }) => {
  const dataRules = await getAllRules(); 
  const gameRules = dataRules.find((item) => item.role === role);
  const gameData = data.find((item) => item.id === id);
  const dict = await getDictionary(lang);

  if (!gameData) {
    return <div>Гра {id} не знайдена</div>;
  }

  return (
    <div className="pt-[130px]">
     <Header textTr={dict.header} lang={lang} />
     <div className="layout flex justify-end">
      <p className="text-3xl text-grey-font-color">Початок гри через</p>
      <TimerPlayer className="text-center text-3xl mr-3.5 pointer ml-5"/>
      </div>
      <GameComponent lang={lang} id={gameData.id} /> 
      {gameRules?.role === "player" ? (
        <RulesActivePlayer role={gameRules?.role} textTr={dict.rulesGame} lang={lang} />
      ) : (
        <RulesAdmin role={gameRules?.role} textTr={dict.rulesGame} lang={lang} />
      )}
       <Footer textTr={dict.header} lang={lang} />
    </div>
  );
};

export default RolePage;
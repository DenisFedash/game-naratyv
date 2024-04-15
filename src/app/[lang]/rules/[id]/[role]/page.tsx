import { FC } from "react";
import { RulesComponentProps } from "@/interfaces/Props.interface";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getAllRules } from "@/app/(server)/api/rules/data";
// import rules from "../../../../../../public/data/dataRules.json";
import data from "../../../../../../public/data/dataGames.json";
import { RulesPlayer } from "@/components/RulesComponent/RulesPlayer";
import { RulesAdmin } from "@/components/RulesComponent/RulesAdmin";
import { GameComponent } from "@/components/RulesComponent/GameComponent";


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
    <>
      <GameComponent lang={lang} id={gameData.id} /> 
      {gameRules?.role === "player" ? (
        <RulesPlayer role={gameRules?.role} textTr={dict.rulesGame} lang={lang} />
      ) : (
        <RulesAdmin role={gameRules?.role} textTr={dict.rulesGame} lang={lang} />
      )}
    </>
  );
};

export default RolePage;
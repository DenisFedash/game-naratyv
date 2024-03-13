import { getDictionary } from "../../dictionaries";
import { GameComponent } from "@/components/RulesComponent/GameComponent";
import data from "../../../../../public/data/dataGames.json";
import { BtnComponent } from "@/components/RulesComponent/BtnComponent";

 export const generateStaticParams = async () => {
    return data.map((game) => ({
     params: { id: game.id },
    }));
  }

const RulePage = async ({ params: { lang, id } }: { params: { lang: string, id: string } }) => {
 const gameData = data.find((item) => item.id === id);
const dict = await getDictionary(lang);
  return (
     <>
       <GameComponent lang={lang} id={gameData?.id} /> 
       <BtnComponent lang={lang} textTr={dict.rulesGame} 
        id={id}
       /> 
     </>
   );
 };

 export default RulePage;
import { getDictionary } from "../../dictionaries";
import { GameComponent } from "@/components/RulesComponent/GameComponent";
import data from "../../../../../public/data/dataGames.json";
import { BtnComponent } from "@/components/RulesComponent/BtnComponent";
import { Header } from "@/components/Header/FullHeader/Header";
import { Footer } from "@/components/Footer/FullFooter/Footer";
import { GamePage } from "@/components/RulesComponent/GamePage";

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
     <Header textTr={dict.header} lang={lang} />
       <GameComponent lang={lang} id={gameData?.id} /> 
       <GamePage lang={lang} textTr={dict.rulesGame} 
        // id={id}
        />
       {/* <BtnComponent lang={lang} textTr={dict.rulesGame} 
        id={id}
       />  */}
       <Footer textTr={dict.header} lang={lang} />
     </>
   );
 };

 export default RulePage;
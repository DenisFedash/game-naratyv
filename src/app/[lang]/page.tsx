import { getDictionary } from "./dictionaries";
import { RulesDetailed } from "@/components/RulesComponent/RulesDetailed ";


export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <main>
      <h1>Hello</h1>
      <RulesDetailed textTr={dict.rulesGame} lang={lang}/> 
    </main>
  );
}

import { getDictionary } from "../dictionaries";
import { GameSettings } from "@/components/GameSettings/GameSettings";

const CreateGamePage = async ({
	params: { lang },
}: {
	params: { lang: string };
}) => {
	const dict = await getDictionary(lang);
	return <GameSettings textTr={dict.gameSettings} lang={lang} />;
};

export default CreateGamePage;

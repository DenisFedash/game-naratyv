import Image from "next/image";
import iconCross from "../../../../public/icon/cross.svg";

interface BtnToCloseTheTeamHistoryProps {
	setIsOpenTeamHistory: (b: boolean) => void;
}

const BtnToCloseTheTeamHistory: React.FC<BtnToCloseTheTeamHistoryProps> = ({
	setIsOpenTeamHistory,
}) => {
	const closeTheTeamHistory = (): void => setIsOpenTeamHistory(false);
	return (
		<button
			className="hover:scale-110 focus:scale-110 active:scale-95 transition-all"
			onClick={closeTheTeamHistory}
			type="button"
		>
			<Image src={iconCross} alt="icon-cross" width="0" height="0" />
		</button>
	);
};

export default BtnToCloseTheTeamHistory;

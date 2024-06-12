import Image from "next/image";
import iconFile from "../../../../public/icons/icon-file.svg";

interface BtnToOpenTheTeamHistoryProps {
	setIsOpenTeamHistory: (b: boolean) => void;
	isOpenTeamHistory: boolean;
}

const BtnToOpenTheTeamHistory: React.FC<BtnToOpenTheTeamHistoryProps> = ({
	setIsOpenTeamHistory,
	isOpenTeamHistory,
}) => {
	const openTheTeamHistory = (): void => setIsOpenTeamHistory(true);
	return (
		<button
			className="hover:scale-110 focus:scale-110 active:scale-95 transition-all
		disabled:cursor-auto disabled:opacity-50 disabled:hover:scale-100 disabled:focus:scale-100"
			onClick={openTheTeamHistory}
			disabled={isOpenTeamHistory}
			type="button"
		>
			<Image
				src={iconFile}
				alt="icon-file"
				width="0"
				height="0"
				className="max-w-6 border-none"
			/>
		</button>
	);
};

export default BtnToOpenTheTeamHistory;

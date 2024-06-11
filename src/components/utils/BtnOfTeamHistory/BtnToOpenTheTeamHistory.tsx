interface BtnToOpenTheTeamHistoryProps {
	children: React.ReactNode;
	setIsOpenTeamHistory: (b: boolean) => void;
	isOpenTeamHistory: boolean;
}

const BtnToOpenTheTeamHistory: React.FC<BtnToOpenTheTeamHistoryProps> = ({
	children,
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
		>
			{children}
		</button>
	);
};

export default BtnToOpenTheTeamHistory;

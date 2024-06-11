interface BtnToCloseTheTeamHistoryProps {
	setIsOpenTeamHistory: (b: boolean) => void;
	children: React.ReactNode;
}

const BtnToCloseTheTeamHistory: React.FC<BtnToCloseTheTeamHistoryProps> = ({
	setIsOpenTeamHistory,
	children,
}) => {
	const closeTheTeamHistory = (): void => setIsOpenTeamHistory(false);
	return (
		<button
			className="hover:scale-110 focus:scale-110 active:scale-95 transition-all"
			onClick={closeTheTeamHistory}
		>
			{children}
		</button>
	);
};

export default BtnToCloseTheTeamHistory;

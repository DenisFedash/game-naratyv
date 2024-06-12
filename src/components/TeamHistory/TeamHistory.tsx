import Image from "next/image";
import Cross from "../../../public/icon/cross.svg";
import BtnToCloseTheTeamHistory from "../utils/BtnOfTeamHistory/BtnToCloseTheTeamHistory";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface TeamHistoryProps {
	setIsOpenTeamHistory: (b: boolean) => void;
}

const TeamHistory: React.FC<TeamHistoryProps> = ({ setIsOpenTeamHistory }) => {
	const [history, setHistory] = useState<string>("");

	const [socket, setSocket] = useState<Socket | undefined>(undefined);

	useEffect(() => {
		const s = io("http://localhost:5000");
		setSocket(s);

		const isEmpty = localStorage.getItem("history");
		isEmpty && setHistory(isEmpty);

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket) {
			socket.emit("history", history);
			socket.on("history", (teamHistory) => {
				setHistory(teamHistory);
			});

			localStorage.setItem("history", history);
		}
	}, [history]);

	const watchingHistory = ({
		currentTarget: { value },
	}: React.ChangeEvent<HTMLTextAreaElement>) => setHistory(value);

	return (
		<li className="h-[520px] w-[318px] bg-main-white  border border-dark-grey p-2">
			<div className="flex justify-between mb-4">
				<p className="text-dark-grey text-base font-bold">Ісория команди</p>
				<BtnToCloseTheTeamHistory
					setIsOpenTeamHistory={setIsOpenTeamHistory}
					children={<Image src={Cross} alt="cross" />}
				/>
			</div>
			<textarea
				className="w-full h-[460px] resize-none pr-6 p-1 text-sm font-normal outline-none"
				name="team history "
				onChange={watchingHistory}
				value={history}
			/>
		</li>
	);
};

export default TeamHistory;

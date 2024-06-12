import Image from "next/image";
import iconHandGrey from "../../../public/icon/icon-hand-grey.svg";
import iconHandOrange from "../../../public/icon/icon-hand-orange.svg";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const someArr: any[] = [
	{ name: "asdf", id: 1 },
	{ name: "asdf", id: 2 },
	{ name: "Vladyslav", id: 3 },
];

interface ActiveHandProps {
	setIsPressed: (b: boolean) => void;
	isPressed: boolean;
}

const ActiveHand: React.FC<ActiveHandProps> = ({ setIsPressed, isPressed }) => {
	const [player, setPlayer] = useState<string>("");
	const [socket, setSocket] = useState<Socket | undefined>(undefined);

	useEffect(() => {
		const s = io("http://localhost:5001");
		setSocket(s);

		const id = someArr.find((p) => p.id === 3);

		setPlayer(id.name);
		console.log(id);

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket) {
			socket.emit("is-pressed", isPressed);
			socket.on("is-pressed", (p) => {
				setIsPressed(p);
			});
		}
	}, [isPressed]);

	const handlerClick = () => {
		setIsPressed(true);
	};
	return (
		<>
			{isPressed && (
				<span className="text-orange cursor-auto select-none">{player}</span>
			)}
			<button
				type="button"
				onClick={handlerClick}
				className={
					isPressed
						? "cursor-auto"
						: "hover:scale-110 focus:scale-110 active:scale-95 transition-all"
				}
			>
				<Image
					src={isPressed ? iconHandOrange : iconHandGrey}
					alt="icon-hand"
					height="0"
					width="0"
					className={`max-w-6 ${isPressed && "text-orange"}`}
				/>
			</button>
		</>
	);
};

export default ActiveHand;

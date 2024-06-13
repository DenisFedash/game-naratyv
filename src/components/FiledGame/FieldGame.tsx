"use client";
import React, { useEffect, useState } from "react";
import dataTeam from "../../../public/data/teamPlayers.json";
import Image from "next/image";
import { pressStart2p } from "@/app/[lang]/fonts";
import iconBrash from "../../../public/icons/icon-eraser.svg";
import iconPen from "../../../public/icons/icon-pen.svg";
import iconFigures from "../../../public/icons/icon-figures.svg";
import iconBg from "../../../public/icons/icon-background.svg";
import iconBack from "../../../public/icons/icon-back.svg";
import iconFwd from "../../../public/icons/icon-fwd.svg";
import ShapesModal from "../FigurePicker/Modal";
import { DrawingBoard } from "../FigurePicker/FigurePicker";
import { Canvas } from "../Canva/Canva";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { BgColorPicker } from "../ColorPicker/BgColorPicker";
import io, { Socket } from "socket.io-client";

import TeamHistory from "../TeamHistory/TeamHistory";
import BtnToOpenTheTeamHistory from "../utils/BtnOfTeamHistory/BtnToOpenTheTeamHistory";
import ActiveHand from "../ActiveHand/ActiveHand";

export const FieldGame = () => {
	const [isOpenColor, setIsOpenColor] = useState(false);
	const [isOpenBgColor, setIsOpenBgColor] = useState(false);
	const [isOpenFigure, setIsOpenFigure] = useState(false);
	const [drawingData, setDrawingData] = useState<any>(null);
	const [eraserMode, setEraserMode] = useState(false);
	const [timer, setTimer] = useState(120);
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const [timerRunning, setTimerRunning] = useState(false);
	const [isOpenTeamHistory, setIsOpenTeamHistory] = useState<boolean>(false);
	const [isPressed, setIsPressed] = useState<boolean>(false);

	useEffect(() => {
		const s = io("http://localhost:5000");
		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	// useEffect(() => {
	//   let interval;
	//   if (timerRunning && timer > 0) {
	//     interval = setInterval(() => {
	//       setTimer((prevTimer) => {
	//         if (prevTimer > 0) {
	//           return prevTimer - 1;
	//         } else {
	//           stopTimer(); // Остановка таймера, если время истекло
	//           return 0;
	//         }
	//       });
	//     }, 1000);
	//   } else if (timer === 0) {
	//     stopTimer();
	//   }
	//   return () => clearInterval(interval); // Очистка интервала при размонтировании компонента или остановке таймера
	// }, [timerRunning, timer]);

	const handleTimerClick = () => {
		if (!timerRunning) {
			startTimer();
		}
	};

	const toggleEraserMode = () => {
		setEraserMode(!eraserMode);
	};

	const startTimer = () => {
		setTimerRunning(true);
		if (socket) {
			socket.emit("start-timer");
		}
	};

	const stopTimer = () => {
		setTimerRunning(false);
	};

	useEffect(() => {
		if (socket) {
			socket.on("timer-update", (updatedTimer) => {
				setTimer(updatedTimer);
			});
		}
		return () => {
			if (socket) {
				socket.off("timer-update");
			}
		};
	}, [socket]);

	const formatTime = (timeInSeconds: number) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0"
		)}`;
	};

	useEffect(() => {
		if (socket) {
			socket.on("timer-update", (updatedTimer) => {
				setTimer(updatedTimer);
				if (updatedTimer === 0) {
					stopTimer(); // Остановка таймера, если время истекло
				}
			});
		}
		return () => {
			if (socket) {
				socket.off("timer-update");
			}
		};
	}, [socket]);

	const handleDrawingUpdate = (updatedDrawingData: any) => {
		setDrawingData(updatedDrawingData);
	};

	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [selectedBgColor, setSelectedBgColor] = useState<string | null>(null);
	const [selectedShape, setSelectedShape] = useState<string | null>(null);

	const handleColorSelect = (color: string) => {
		setSelectedColor(color);
	};

	const handleBgColorSelect = (color: string) => {
		setSelectedBgColor(color);
	};

	const selectShape = (shape: string) => {
		setSelectedShape(shape);
	};

	const isEmptyInputForUrl = ({
		currentTarget: { value },
	}: React.ChangeEvent<HTMLInputElement>) =>
		value === "" && setIsPressed(false);

	return (
		<div className="layout">
			{/* <ul className="flex items-center justify-end my-11">
        {dataTeam.map(({ id, name, icon }, index) => (
          <li
            key={id}
            className="-mr-5 last:mr-0"
            style={{ zIndex: dataTeam.length - index }}
          >
            <Image
              src={icon}
              alt="icon"
              width="0"
              height="0"
              className="w-[54px] h-auto"
            />
          </li>
        ))}
      </ul> */}
			<h1 className={`text-center text-3xl mb-4 ${pressStart2p.className}`}>
				Назва команди
			</h1>
			<p className="text-3xl text-center mb-6 ">Назва гри</p>
			<div className="flex gap-x-4 items-center">
				<ul
					className="h-[596px] flex flex-col justify-around  bg-dark-grey rounded-lg py-5 px-[20.5px] shadow-3xl"
					onClick={() => {
						toggleEraserMode();
					}}
				>
					<li>
						<Image
							src={iconBrash}
							alt="brash"
							width="0"
							height="0"
							className=" w-12 h-auto"
						/>
					</li>
					<li
						className="cursor-pointer relative"
						onClick={() => setIsOpenColor(!isOpenColor)}
					>
						<Image
							src={iconPen}
							alt="pen"
							width="0"
							height="0"
							className=" w-12 h-auto"
						/>
						<div className={isOpenColor ? "absolute -top-6 left-16" : "hidden"}>
							<ColorPicker
								setIsOpenColor={setIsOpenColor}
								onColorSelect={(color) => {
									handleColorSelect(color);
								}}
							/>
						</div>
					</li>
					<li
						className="cursor-pointer relative"
						onClick={() => setIsOpenFigure(!isOpenFigure)}
					>
						<Image
							src={iconFigures}
							alt="figures"
							width="0"
							height="0"
							className=" w-12 h-auto"
						/>
						<div
							className={isOpenFigure ? "absolute -top-6 left-16" : "hidden"}
						>
							<ShapesModal
								setIsOpenFigure={setIsOpenFigure}
								onSelectShape={selectShape}
							/>
						</div>
					</li>
					<li
						className="cursor-pointer relative"
						onClick={() => setIsOpenBgColor(!isOpenBgColor)}
					>
						<Image
							src={iconBg}
							alt="background"
							width="0"
							height="0"
							className="w-12 h-auto"
						/>
						<div
							className={isOpenBgColor ? "absolute -top-6 left-16" : "hidden"}
						>
							<BgColorPicker
								setIsOpenBgColor={setIsOpenBgColor}
								onColorSelect={(color) => {
									handleBgColorSelect(color);
								}}
							/>
						</div>
					</li>
				</ul>
				<div>
					<ul className=" bg-main-white flex items-center justify-between h-[64px] shadow-panel-shadow mb-2">
						<li className="flex gap-4 items-center px-4">
							<button
								type="button"
								className="flex items-center justify-center bg-main-grey rounded-lg py-1 px-2.5"
							>
								<Image
									src={iconBack}
									alt="icon-back"
									width="0"
									height="0"
									className="max-w-6 h-6"
								/>
							</button>
							<button
								type="button"
								className="flex items-center justify-center rounded-lg py-1 px-2.5"
							>
								<Image
									src={iconFwd}
									alt="icon-fwd"
									width="0"
									height="0"
									className="max-w-6 h-6"
								/>
							</button>
						</li>
						<li className=" border-x border-main-grey w-full px-6 h-full py-3.5">
							<input
								type="text"
								placeholder="Посилання на meet"
								className=" text-2xl outline-none w-full"
								onChange={isEmptyInputForUrl}
							/>
						</li>
						<li className="h-full flex flex-col items-center justify-center px-9">
							<ActiveHand setIsPressed={setIsPressed} isPressed={isPressed} />
						</li>
						<li className="flex items-center border-x border-main-grey px-8 h-full">
							<BtnToOpenTheTeamHistory
								setIsOpenTeamHistory={setIsOpenTeamHistory}
								isOpenTeamHistory={isOpenTeamHistory}
							/>
						</li>
						<li className="flex items-center justify-center px-6">
							<p className="text-4xl text-dark-grey" onClick={handleTimerClick}>
								{formatTime(timer)}
							</p>
						</li>
					</ul>
					{/* <div>
					<DrawingBoard
              selectedColor={selectedColor}
              selectedShape={selectedShape}
              setSelectedShape={setSelectedShape}
              color={selectedColor}
            />
					</div> */}
					<ul className="flex gap-x-1 items-center">
						<Canvas
							color={selectedColor}
							selectedBgColor={selectedBgColor}
							setSelectedBgColor={setSelectedBgColor}
							eraserMode={eraserMode}
							setEraserMode={setEraserMode}
							isOpenTeamHistory={isOpenTeamHistory}
						/>

						{isOpenTeamHistory && (
							<TeamHistory setIsOpenTeamHistory={setIsOpenTeamHistory} />
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

import React, { FC, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface CanvasProps {
	color: string | null;
	selectedBgColor: string | null;
	setSelectedBgColor: (color: string) => void;
	eraserMode: boolean;
	setEraserMode: (eraserMode: boolean) => void;
	isOpenTeamHistory: boolean;
}

export const Canvas: FC<CanvasProps> = ({
	color,
	selectedBgColor,
	setSelectedBgColor,
	eraserMode,
	setEraserMode,
	isOpenTeamHistory,
}) => {
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const [imageData, setImageData] = useState<string | null>(null);

	useEffect(() => {
		const s = io("http://localhost:5000");
		setSocket(s);

		s.emit("get-canvas-data");

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		const handleCanvasData = (data: string) => {
			setImageData(data);
			drawImageOnCanvas(data);
		};

		if (socket) {
			socket.on("canvas-data", handleCanvasData);
		}

		return () => {
			if (socket) {
				socket.off("canvas-data", handleCanvasData);
			}
		};
	}, [socket]);

	useEffect(() => {
		if (socket && selectedBgColor !== null) {
			socket.emit("background-color", selectedBgColor);
		}
	}, [selectedBgColor, socket]);

	useEffect(() => {
		if (socket) {
			socket.on("background-color", (color) => {
				setSelectedBgColor(color);
			});
		}
	}, [socket, setSelectedBgColor]);

	useEffect(() => {
		if (socket && imageData) {
			socket.emit("canvas-data", imageData);
		}
	}, [socket, imageData]);

	useEffect(() => {
		if (socket) {
			console.log("Отправка режима ластика:", eraserMode);
			socket.emit("eraser-mode", eraserMode); // Отправка состояния режима ластика на сервер
		}
	}, [eraserMode, socket]);

	useEffect(() => {
		if (socket) {
			// Слушаем изменения состояния режима ластика с сервера
			socket.on("eraser-mode", (mode) => {
				console.log("Состояние режима ластика получено:", mode);
				// Обновляем локальное состояние полученным состоянием режима ластика
				setEraserMode(mode);
			});
		}
	}, [setEraserMode, socket]);

	const drawImageOnCanvas = (data: string) => {
		const canvas = document.querySelector<HTMLCanvasElement>("#board");
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const image = new Image();
		image.onload = () => {
			ctx.drawImage(image, 0, 0);
		};
		image.src = data;
	};

	const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = document.querySelector<HTMLCanvasElement>("#board");
		if (!canvas || !socket) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const offsetX = e.clientX - rect.left;
		const offsetY = e.clientY - rect.top;

		ctx.beginPath();
		ctx.moveTo(offsetX, offsetY);

		if (eraserMode) {
			ctx.globalCompositeOperation = "destination-out";
		} else {
			ctx.globalCompositeOperation = "source-over";
		}

		const handleCanvasMouseMove = (event: MouseEvent) => {
			const offsetX = event.clientX - rect.left;
			const offsetY = event.clientY - rect.top;

			ctx.lineTo(offsetX, offsetY);
			ctx.strokeStyle = color || "black";
			ctx.lineWidth = 2;
			ctx.stroke();
		};

		const handleCanvasMouseUp = () => {
			canvas.removeEventListener("mousemove", handleCanvasMouseMove);
			canvas.removeEventListener("mouseup", handleCanvasMouseUp);

			if (!eraserMode) {
				const base64ImageData = canvas.toDataURL("image/png");
				setImageData(base64ImageData);

				// Send the updated canvas data to the server
				if (socket) {
					socket.emit("canvas-data", base64ImageData);
				}
			}
		};

		canvas.addEventListener("mousemove", handleCanvasMouseMove);
		canvas.addEventListener("mouseup", handleCanvasMouseUp);
	};

	return (
		<li
			className="bg-main-white border border-main-grey w-fit h-fit shadow-field-shadow
"
			id="sketch"
		>
			<canvas
				width={1172}
				height={524}
				id="board"
				onMouseDown={handleCanvasMouseDown}
				style={{
					backgroundColor: selectedBgColor ? selectedBgColor : "transparent",
					width: isOpenTeamHistory ? "850px" : "1172px",
					height: isOpenTeamHistory ? "384px" : "524px",
				}}
			/>
		</li>
	);
};

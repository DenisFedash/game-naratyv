import React, { FC, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface CanvasProps {
  color: string | null;
  selectedBgColor: string | null;
  setSelectedBgColor: (color: string) => void;
  eraserMode: boolean;
  setEraserMode: (eraserMode: boolean) => void;
}

export const Canvas: FC<CanvasProps> = ({
  color,
  selectedBgColor,
  setSelectedBgColor,
  eraserMode,
  setEraserMode,
}) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [imageData, setImageData] = useState<string | null>(null);
  const [drawingMode, setDrawingMode] = useState(true);

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
      socket.on("eraser-mode", (mode) => {
        console.log("Состояние режима ластика получено:", mode);
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

    const handleCanvasMouseMove = (event: MouseEvent) => {
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      ctx.lineTo(offsetX, offsetY);

      ctx.stroke();

      if (eraserMode) {
        ctx.globalCompositeOperation = "source-over"; // Встановлюємо нормальний режим малювання
        ctx.strokeStyle = selectedBgColor || "#ffffff"; // Колір видалення, наприклад, колір фону або білий
        ctx.lineWidth = 4; // Ширина лінії видалення
        const base64ImageData = canvas.toDataURL("image/png");
        setImageData(base64ImageData);
        if (socket) {
          socket.emit("canvas-data", base64ImageData);
        }
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color || "black";
        ctx.lineWidth = 1;
        const base64ImageData = canvas.toDataURL("image/png");
        setImageData(base64ImageData);
        if (socket) {
          socket.emit("canvas-data", base64ImageData);
        }
      }
    };

    const handleCanvasMouseUp = () => {
      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
      canvas.removeEventListener("mouseup", handleCanvasMouseUp);
      setEraserMode(false);
      // Update imageData and send to the server after finishing drawing
    };

    canvas.addEventListener("mousemove", handleCanvasMouseMove);
    canvas.addEventListener("mouseup", handleCanvasMouseUp);
  };

  return (
    <div className="bg-main-white border border-dark-grey" id="sketch">
      <canvas
        width={1172}
        height={448}
        id="board"
        onMouseDown={handleCanvasMouseDown}
        style={{
          backgroundColor: selectedBgColor ? selectedBgColor : "transparent",
        }}
      ></canvas>
    </div>
  );
};

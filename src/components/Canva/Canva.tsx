import React, { FC, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

interface CanvasProps {
  color: string | null;
}

export const Canvas: FC<CanvasProps> = ({ color }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const sketch = document.querySelector<HTMLElement>("#sketch");
    if (!sketch) {
      return;
    }

    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    let isDrawing = false;
    let lastPosition: { x: number; y: number } | null = null;

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      lastPosition = {
        x: e.pageX - canvas.offsetLeft,
        y: e.pageY - canvas.offsetTop,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;

      const currentPosition = {
        x: e.pageX - canvas.offsetLeft,
        y: e.pageY - canvas.offsetTop,
      };

      if (lastPosition) {
        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(currentPosition.x, currentPosition.y);
        ctx.strokeStyle = color || "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Emit drawing data to the server
        if (socket) {
          socket.emit("draw", {
            lastPosition,
            currentPosition,
            color,
          });
        }
      }

      lastPosition = currentPosition;
    };

    const handleMouseUp = () => {
      isDrawing = false;
      lastPosition = null;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [color, socket]);

  return (
    <div className="bg-main-white border border-dark-grey" id="sketch">
      <canvas ref={canvasRef} width={1172} height={448} id="board"></canvas>
    </div>
  );
};

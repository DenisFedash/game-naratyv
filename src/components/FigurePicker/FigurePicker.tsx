import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

interface DrawingBoardProps {
  selectedColor: string | null;
  selectedShape: string | null;
  setSelectedShape: (shape: string | null) => void;
  color: string | null;

  socket?: Socket;
}

export const DrawingBoard: FC<DrawingBoardProps> = ({
  selectedColor,
  selectedShape,
  setSelectedShape,
  color,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [figures, setFigures] = useState<
    Array<{
      type: string;
      points: Array<{ x: number; y: number }>;
      color: string;
    }>
  >([]);
  const [drawing, setDrawing] = useState<Array<{ x: number; y: number }>>([]);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // const s = io("https://dg29hbl9-5556.euw.devtunnels.ms/");
    const s = io("http://localhost:5556")
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("initData", ({ figures, drawing }) => {
        setFigures(figures);
        setDrawing(drawing);
      });

      socket.on("draw", (data) => {
        setDrawing([...drawing, data]);
      });

      socket.on("addFigure", (figure) => {
        setFigures([...figures, figure]);
      });

      socket.on("clearCanvas", () => {
        setDrawing([]);
        setFigures([]);
      });
    }
    if (socket) {
      socket.emit("colorSelect", color);
    }
  }, [socket, drawing, figures, color]);

  useEffect(() => {
    if (socket) {
      socket.emit("initData");
    }
  }, [socket]);

  const startNewFigure = useCallback(() => {
    setDrawing([]);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      setIsDrawing(true);
      startNewFigure();
    },
    [startNewFigure]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!canvasRef.current || !isDrawing) return;

      const canvas = canvasRef.current;
      const offsetX = e.clientX - canvas.getBoundingClientRect().left;
      const offsetY = e.clientY - canvas.getBoundingClientRect().top;

      setDrawing([...drawing, { x: offsetX, y: offsetY }]);
      if (socket) {
        socket.emit("draw", { x: offsetX, y: offsetY });
      }
    },
    [isDrawing, drawing, socket]
  );

  const drawFigures = useCallback(
    (context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      figures.forEach((figure) => {
        const { type, points, color } = figure;

        context.beginPath();
        context.strokeStyle = color || "black";
        context.lineWidth = 2;

        if (type === "freehand") {
          points.forEach((point, index) => {
            if (index === 0) {
              context.moveTo(point.x, point.y);
            } else {
              context.lineTo(point.x, point.y);
              context.stroke();
            }
          });
        } else if (type === "square") {
          const topLeft = points[0];
          const bottomRight = points[1];
          const width = bottomRight.x - topLeft.x;
          const height = bottomRight.y - topLeft.y;
          context.strokeRect(topLeft.x, topLeft.y, width, height);
        } else if (type === "diamond") {
          const [top, right, bottom, left] = points;
          context.moveTo(top.x, top.y);
          context.lineTo(right.x, right.y);
          context.lineTo(bottom.x, bottom.y);
          context.lineTo(left.x, left.y);
          context.closePath();
          context.stroke();
        } else if (type === "triangle") {
          const [top, right, left] = points;
          context.moveTo(top.x, top.y);
          context.lineTo(right.x, right.y);
          context.lineTo(left.x, left.y);
          context.closePath();
          context.stroke();
        } else if (type === "line") {
          const [start, end] = points;
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y);
          context.stroke();
        } else if (type === "arrowLine") {
          const [start, end] = points;
          const arrowLength = 30;
          const arrowWidth = 15;
          const legLength = 50;

          context.moveTo(end.x, end.y);
          context.lineTo(start.x, start.y);

          const angle = Math.atan2(end.y - start.y, end.x - start.x);
          context.lineTo(
            end.x -
              arrowLength * Math.cos(angle) +
              arrowWidth * Math.cos(angle - Math.PI / 2),
            end.y -
              arrowLength * Math.sin(angle) +
              arrowWidth * Math.sin(angle - Math.PI / 2)
          );

          context.moveTo(end.x, end.y);
          context.lineTo(
            end.x -
              arrowLength * Math.cos(angle) +
              arrowWidth * Math.cos(angle + Math.PI / 2),
            end.y -
              arrowLength * Math.sin(angle) +
              arrowWidth * Math.sin(angle + Math.PI / 2)
          );

          context.moveTo(end.x, end.y);
          context.lineTo(
            end.x + legLength * Math.cos(angle),
            end.y + legLength * Math.sin(angle)
          );

          context.stroke();
        }
      });

      drawing.forEach((position, index) => {
        if (index === 0) {
          context.beginPath();
          context.moveTo(position.x, position.y);
        } else {
          context.lineTo(position.x, position.y);
          context.strokeStyle = selectedColor || "black";
          context.lineWidth = 2;
          context.stroke();
        }
      });
      console.log("figures", figures);
    },
    [figures, drawing, selectedColor]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setIsDrawing(false);
      if (socket) {
        const newFigure = {
          type: "freehand",
          points: drawing,
          color: selectedColor || "black",
        };

        socket.emit("addFigure", newFigure);
        setFigures([...figures, newFigure]);

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          if (context) {
            drawFigures(context);
          }
        }
      }
    },
    [socket, drawing, selectedColor, figures, drawFigures]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        drawFigures(context);
      }
    }
  }, [drawFigures]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1172}
        height={448}
        className="bg-main-white border border-dark-grey"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

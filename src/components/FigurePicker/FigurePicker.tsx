"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ShapesModal from "./Modal";

export const FigurePicker = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [isShapesModalOpen, setShapesModalOpen] = useState(false);

  const openShapesModal = () => {
    setShapesModalOpen(true);
  };

  const closeShapesModal = () => {
    setShapesModalOpen(false);
  };

  const selectShape = (shape: string) => {
    closeShapesModal();
    setSelectedShape(shape);
  };

  const drawCircle = useCallback(
    (context: CanvasRenderingContext2D, x: number, y: number) => {
      context.beginPath();
      context.arc(x, y, 30, 0, 2 * Math.PI);
      context.strokeStyle = "blue";
      context.stroke();
    },
    []
  );

  const drawSquare = useCallback(
    (context: CanvasRenderingContext2D, x: number, y: number) => {
      context.strokeStyle = "red";
      context.strokeRect(x - 30, y - 30, 60, 60);
    },
    []
  );

  const drawTriangle = useCallback(
    (context: CanvasRenderingContext2D, x: number, y: number) => {
      context.beginPath();
      context.moveTo(x, y - 30);
      context.lineTo(x + 30, y + 30);
      context.lineTo(x - 30, y + 30);
      context.closePath();
      context.strokeStyle = "green";
      context.stroke();
    },
    []
  );

  const drawShape = useCallback(
    (context: CanvasRenderingContext2D, x: number, y: number) => {
      if (selectedShape === "circle") {
        drawCircle(context, x, y);
      } else if (selectedShape === "square") {
        drawSquare(context, x, y);
      } else if (selectedShape === "triangle") {
        drawTriangle(context, x, y);
      }
    },
    [selectedShape, drawCircle, drawSquare, drawTriangle]
  );

  const redrawCanvas = useCallback(() => {
    if (canvasRef.current && selectedShape) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawShape(context, 100, 100); // Позицию можно корректировать по необходимости
      }
    }
  }, [selectedShape, drawShape]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (selectedShape && canvasRef.current) {
        const canvas = canvasRef.current;
        const offsetX = e.clientX - canvas.getBoundingClientRect().left;
        const offsetY = e.clientY - canvas.getBoundingClientRect().top;

        setIsDragging(true);
      }
    },
    [selectedShape]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (isDragging && canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);

          const rect = canvas.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;

          if (selectedShape === "circle") {
            drawCircle(context, offsetX, offsetY);
          } else if (selectedShape === "square") {
            drawSquare(context, offsetX, offsetY);
          } else if (selectedShape === "triangle") {
            drawTriangle(context, offsetX, offsetY);
          }
        }
      }
    },
    [isDragging, selectedShape, drawCircle, drawSquare, drawTriangle]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        return () => {
          canvas.removeEventListener("mousedown", handleMouseDown);
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={openShapesModal}
      >
        Выбрать фигуру
      </button>
      <ShapesModal
        isOpen={isShapesModalOpen}
        onClose={closeShapesModal}
        onSelectShape={selectShape}
      />
      <canvas
        ref={canvasRef}
        width={1000}
        height={800}
        className="mt-4 border"
        style={{ cursor: selectedShape ? "grab" : "auto" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

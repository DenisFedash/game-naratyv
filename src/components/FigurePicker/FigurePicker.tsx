"use client";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import ShapesModal from "./Modal";
import { ColorProps, FigureProps } from "@/interfaces/Props.interface";

export const FigurePicker: FC<FigureProps> = ({ selectedColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [figures, setFigures] = useState<
    Array<{ type: string; x: number; y: number; color?: string }>
  >([]);
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

  const drawShapes = useCallback(
    (context: CanvasRenderingContext2D) => {
      figures.forEach((figure) => {
        const { type, x, y, color } = figure;

        context.beginPath();
        context.strokeStyle = color || selectedColor || "blue"; // Update this line
        context.lineWidth = 2;

        if (type === "circle") {
          context.arc(x, y, 30, 0, 2 * Math.PI);
          context.stroke();
        } else if (type === "square") {
          context.strokeRect(x - 30, y - 30, 60, 60);
        } else if (type === "triangle") {
          context.moveTo(x, y - 30);
          context.lineTo(x + 30, y + 30);
          context.lineTo(x - 30, y + 30);
          context.closePath();
          context.stroke();
        }
      });
    },
    [figures, selectedColor]
  );

  const redrawCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawShapes(context);
      }
    }
  }, [drawShapes]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (selectedShape && canvasRef.current) {
        const canvas = canvasRef.current;
        const offsetX = e.clientX - canvas.getBoundingClientRect().left;
        const offsetY = e.clientY - canvas.getBoundingClientRect().top;

        const newFigure = {
          type: selectedShape,
          x: offsetX,
          y: offsetY,
          color: selectedColor || undefined,
        };
        setFigures([...figures, newFigure]);
        setSelectedShape(null);
      }
    },
    [selectedShape, selectedColor, figures]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // if (context) {
      //   canvas.addEventListener("mousedown", handleMouseDown);

      //   return () => {
      //     canvas.removeEventListener("mousedown", handleMouseDown);
      //   };
      // }
    }
  }, [handleMouseDown, selectedColor]);

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
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

// "use client";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import ShapesModal from "./Modal";

// export const FigurePicker = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [figures, setFigures] = useState<
//     Array<{ type: string; x: number; y: number }>
//   >([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [selectedShape, setSelectedShape] = useState<string | null>(null);
//   const [isShapesModalOpen, setShapesModalOpen] = useState(false);

//   const openShapesModal = () => {
//     setShapesModalOpen(true);
//   };

//   const closeShapesModal = () => {
//     setShapesModalOpen(false);
//   };

//   const selectShape = (shape: string) => {
//     closeShapesModal();
//     setSelectedShape(shape);
//   };

//   const drawCircle = useCallback(
//     (context: CanvasRenderingContext2D, x: number, y: number) => {
//       context.beginPath();
//       context.arc(x, y, 30, 0, 2 * Math.PI);
//       context.strokeStyle = "blue";
//       context.stroke();
//     },
//     []
//   );

//   const drawSquare = useCallback(
//     (context: CanvasRenderingContext2D, x: number, y: number) => {
//       context.strokeStyle = "red";
//       context.strokeRect(x - 30, y - 30, 60, 60);
//     },
//     []
//   );

//   const drawTriangle = useCallback(
//     (context: CanvasRenderingContext2D, x: number, y: number) => {
//       context.beginPath();
//       context.moveTo(x, y - 30);
//       context.lineTo(x + 30, y + 30);
//       context.lineTo(x - 30, y + 30);
//       context.closePath();
//       context.strokeStyle = "green";
//       context.stroke();
//     },
//     []
//   );

//   const drawShapes = useCallback(
//     (context: CanvasRenderingContext2D) => {
//       figures.forEach((figure) => {
//         const { type, x, y } = figure;
//         if (type === "circle") {
//           drawCircle(context, x, y);
//         } else if (type === "square") {
//           drawSquare(context, x, y);
//         } else if (type === "triangle") {
//           drawTriangle(context, x, y);
//         }
//       });
//     },
//     [figures, drawCircle, drawSquare, drawTriangle]
//   );

//   const redrawCanvas = useCallback(() => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       if (context) {
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         drawShapes(context);
//       }
//     }
//   }, [drawShapes]);

//   useEffect(() => {
//     redrawCanvas();
//   }, [redrawCanvas]);

//   const handleMouseDown = useCallback(
//     (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
//       if (selectedShape && canvasRef.current) {
//         const canvas = canvasRef.current;
//         const offsetX = e.clientX - canvas.getBoundingClientRect().left;
//         const offsetY = e.clientY - canvas.getBoundingClientRect().top;

//         const newFigure = { type: selectedShape, x: offsetX, y: offsetY };
//         setFigures([...figures, newFigure]);
//         setIsDragging(true);
//         setDragOffset({ x: offsetX, y: offsetY });
//       }
//     },
//     [selectedShape, figures]
//   );

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//   }, []);

//   const handleMouseMove = useCallback(
//     (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
//       if (isDragging && canvasRef.current) {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext("2d");

//         if (context) {
//           const rect = canvas.getBoundingClientRect();
//           const offsetX = e.clientX - rect.left;
//           const offsetY = e.clientY - rect.top;

//           const updatedFigures = figures.map((figure, index) => {
//             if (index === figures.length - 1) {
//               return {
//                 ...figure,
//                 x: figure.x + offsetX - dragOffset.x,
//                 y: figure.y + offsetY - dragOffset.y,
//               };
//             }
//             return figure;
//           });

//           setFigures(updatedFigures);
//           redrawCanvas();
//         }
//       }
//     },
//     [isDragging, figures, dragOffset, redrawCanvas]
//   );

//   useEffect(() => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       if (context) {
//         canvas.addEventListener("mousedown", handleMouseDown);
//         canvas.addEventListener("mousemove", handleMouseMove);
//         canvas.addEventListener("mouseup", handleMouseUp);

//         return () => {
//           canvas.removeEventListener("mousedown", handleMouseDown);
//           canvas.removeEventListener("mousemove", handleMouseMove);
//           canvas.removeEventListener("mouseup", handleMouseUp);
//         };
//       }
//     }
//   }, [handleMouseDown, handleMouseMove, handleMouseUp]);

//   return (
//     <div>
//       <button
//         className="bg-blue-500 text-white p-2 rounded-md"
//         onClick={openShapesModal}
//       >
//         Выбрать фигуру
//       </button>
//       <ShapesModal
//         isOpen={isShapesModalOpen}
//         onClose={closeShapesModal}
//         onSelectShape={selectShape}
//       />
//       <canvas
//         ref={canvasRef}
//         width={1000}
//         height={800}
//         className="mt-4 border"
//         style={{ cursor: selectedShape ? "grab" : "auto" }}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       />
//     </div>
//   );
// };

"use client";
import { ColorProps } from "@/interfaces/Props.interface";
import React, { FC, useEffect, useState } from "react";

const colorList = [
  "#141515",
  "#E10D0D",
  "#FFC727",
  "#183BF1",
  "#13C70F",
  "#FEFEFE",
];

// const colorGrid = colorList.map((color) => {
//   return (
//     <div
//       onClick={() => handleColorClick(color)}
//       key={color}
//       className="w-6 h-6 rounded-full cursor-pointer"
//       style={{ backgroundColor: `${color}` }}
//     ></div>
//   );
// });
interface ColorPickerProps {
  onColorSelect: (color: string) => void;
}

export const ColorPicker: FC<ColorProps> = ({ onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  console.log("Color", selectedColor);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  const colorGrid = colorList.map((color) => {
    return (
      <div
        onClick={() => handleColorClick(color)}
        key={color}
        className="w-6 h-6 rounded-full cursor-pointer"
        style={{ backgroundColor: `${color}` }}
      ></div>
    );
  });
  return (
    <div>
      <div
        id="color-grid"
        className="w-[124px] bg-main-grey grid grid-cols-3 gap-2.5 px-4 py-5 rounded-lg"
      >
        {colorGrid}
      </div>
      <div className="mt-4">
        <p>Выбранный цвет: {selectedColor}</p>
      </div>
    </div>
  );
};

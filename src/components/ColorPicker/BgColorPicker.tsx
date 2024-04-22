"use client";
import { BgColorProps } from "@/interfaces/Props.interface";
import React, { FC, useEffect, useState } from "react";
import { FieldGame } from "../FiledGame/FieldGame";

const colorList = [
  "#141515",
  "#E10D0D",
  "#FFC727",
  "#183BF1",
  "#13C70F",
  "#FEFEFE",
];

export const BgColorPicker: FC<BgColorProps> = ({
  onColorSelect,
  setIsOpenBgColor,
}) => {
  const [selectedBgColor, setSelectedBgColor] = useState<string>("");
  console.log("bgcolor", selectedBgColor);

  const handleColorClick = (color: string) => {
    setSelectedBgColor(color);
    onColorSelect(color);
  };

  const colorGrid = colorList.map((color) => {
    return (
      <div
        onClick={() => {
          handleColorClick(color);
          setIsOpenBgColor(false);
        }}
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
        className="w-[124px] bg-main-grey grid grid-cols-3 gap-2.5 px-4 py-5 rounded-lg z-10"
      >
        {colorGrid}
        <div>
          <input
            value={selectedBgColor}
            type="color"
            onChange={() => handleColorClick}
          />
        </div>
      </div>
    </div>
  );
};

"use client";
import React from "react";

const colorList = [
  "#141515",
  "#E10D0D",
  "#FFC727",
  "#183BF1",
  "#13C70F",
  "#FEFEFE",
];

const colorGrid = colorList.map((color) => {
  return (
    <div
      onClick={() => console.log({ color })}
      key={color}
      className="w-6 h-6 rounded-full cursor-pointer"
      style={{ backgroundColor: `${color}` }}
    >
      <p style={{ backgroundColor: `${color}` }} className="rounded-full"></p>
    </div>
  );
});

export const ColorPicker = () => {
  return (
    <div
      id="color-grid"
      className="w-[124px] bg-main-grey grid grid-cols-3 gap-2.5 px-4 py-5 rounded-lg"
    >
      {colorGrid}
    </div>
  );
};

"use client";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { FigurePicker } from "@/components/FigurePicker/FigurePicker";
import { FieldGame } from "@/components/FiledGame/FieldGame";
import React, { useState } from "react";

const Field = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  return (
    <div>
      <FieldGame />
      {/* <FigurePicker selectedColor={selectedColor} /> */}
    </div>
  );
};

export default Field;

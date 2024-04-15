"use client";
import { Canvas } from "@/components/Canva/Canva";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
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
      {/* <Canvas color={selectedColor}></Canvas> */}
    </div>
  );
};

export default Field;

import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { FigurePicker } from "@/components/FigurePicker/FigurePicker";
import { FieldGame } from "@/components/FiledGame/FieldGame";
import React from "react";

const Field = () => {
  return (
    <div>
      <FieldGame />
      <ColorPicker />
      <FigurePicker />
    </div>
  );
};

export default Field;

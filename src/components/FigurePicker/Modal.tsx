import { ShapesModalProps } from "@/interfaces/Props.interface";
import React, { FC, useEffect } from "react";
import iconSquare from "../../../public/icons/square.svg";
import iconDiamond from "../../../public/icons/icon-diamond.svg";
import iconTriangle from "../../../public/icons/icon-triangle.svg";
import iconLine from "../../../public/icons/icon-line.svg";
import iconArrowLine from "../../../public/icons/icon-arrow-line.svg";
import Image from "next/image";

const ShapesModal: FC<ShapesModalProps> = ({
  setIsOpenFigure,
  onSelectShape,
}) => {
  return (
    <div>
      <div className="w-[124px] bg-main-grey grid grid-cols-3 gap-2.5 px-4 py-5 rounded-lg z-10">
        <button
          onClick={() => {
            onSelectShape("square");
            setIsOpenFigure(false);
          }}
        >
          <Image
            src={iconSquare}
            alt="icon-square"
            width={0}
            height={0}
            className="w-6 h-auto"
          />
        </button>
        <button
          onClick={() => {
            onSelectShape("diamond");
            setIsOpenFigure(false);
          }}
        >
          <Image
            src={iconDiamond}
            alt="icon-diamond"
            width={0}
            height={0}
            className="w-6 h-auto"
          />
        </button>
        <button
          onClick={() => {
            onSelectShape("triangle");
            setIsOpenFigure(false);
          }}
        >
          <Image
            src={iconTriangle}
            alt="icon-triangle"
            width={0}
            height={0}
            className="w-6 h-auto"
          />
        </button>
        <button
          onClick={() => {
            onSelectShape("line");
            setIsOpenFigure(false);
          }}
        >
          <Image
            src={iconLine}
            alt="icon-line"
            width={0}
            height={0}
            className="w-6 h-auto"
          />
        </button>
        <button
          onClick={() => {
            onSelectShape("arrowLine");
            setIsOpenFigure(false);
          }}
        >
          <Image
            src={iconArrowLine}
            alt="icon-arrow-line"
            width={0}
            height={0}
            className="w-6 h-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default ShapesModal;

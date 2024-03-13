import { FC } from "react";
import { BtnProps } from "@/interfaces/Props.interface";

export const RuleCard: FC<BtnProps> = ({ text, className, children }) => {
  return (
    <div className={`border-yellow-400 rounded-lg shadow-yellow-3xl flex items-center ${className}`}>
      <div className="w-[922px]">
        <p className="font-sans text-3xl leading-normal text-start p-2.5">
        {children || text}
        </p>
      </div>
    </div>
  );
};

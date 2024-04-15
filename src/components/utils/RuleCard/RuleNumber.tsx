import { FC } from "react";
import { BtnProps } from "@/interfaces/Props.interface";

export const RuleNumber: FC<BtnProps> = ({ text, className, children }) => {
  return (
      <div className={`border border-main-font-color rounded-lg shadow-3xl bg-main-white flex ${className}`}>
        {text || children}
        </div>
  );
};

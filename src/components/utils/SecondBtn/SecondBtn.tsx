import Image from "next/image";
import iconClick from "../../../../public/icon/icon-click.svg";
import { FC } from "react";
import { BtnProps } from "@/interfaces/Props.interface";

export const SecondBtn: FC<BtnProps> = ({ children, text, className }) => {
  return (
    <div className={`border border-main-font-color rounded-lg shadow-3xl font-bold flex items-center max-w-[263px] md:max-w-[466px] hover:bg-orange focus:outline-none transform transition-transform duration-200 ease-in-out active:scale-90 ${className}`}>
      <div className="w-[382px] border-r-2 border-gray-300">
        <p className="text-base md:text-3xl font-bold text-center p-2.5 md:py-5">
        {children || text}
        </p>
      </div>
      <div className="w-[84px] bg-main-yellow  p-2.5 md:p-4 rounded-r-lg">
        <Image
          src={iconClick}
          alt="icon-click"
          width={20}
          height={20}
          className="md:w-12 md:h-12"
        />
      </div>
    </div>
  );
};

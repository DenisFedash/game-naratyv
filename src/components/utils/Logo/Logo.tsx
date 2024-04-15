import Link from "next/link";
import iconLogo from "/public/icon/icon-logo.svg";
import Image from "next/image";
import { pressStart2p } from "@/app/[lang]/fonts";
import { FC } from "react";
import { LogoFCComponentsProps } from "@/interfaces/Props.interface";

export const Logo: FC<LogoFCComponentsProps> = ({ lang, setIsOpen }) => {
  return (
    <div className="w-[106px] md:w-[278px] ">
      <Link
        onClick={() => setIsOpen(false)}
        href={`/${lang}`}
        className="flex flex-wrap justify-center items-center bg-main-white px-1.5 py-1 md:px-4 md:py-2 rounded md:rounded-lg shadow-3xl"
      >
        <Image
          src={iconLogo}
          alt="logo"
          width={20}
          height={20}
          className="mr-2 md:w-[50px] md:h-[50px]"
        />
        <div className={`text-xs md:text-3xl ${pressStart2p.className}`}>
          <span>Сo</span>
          <span className="text-orange">LAB</span>
        </div>
      </Link>
    </div>
  );
};

"use client";
import { TextHeaderProps } from "@/interfaces/Props.interface";
import { FC, useState } from "react";
import LanguageSection from "./LanguageSection/LanguageSection";
import { usePathname } from "next/navigation";
import { Logo } from "../utils/Logo/Logo";

export const Header: FC<TextHeaderProps> = ({ textTr, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = (prev: boolean) => {
    setIsOpen(!prev);
  };
  const pathName = usePathname();
  return (
    <div className="relative pb-[75px] md:pb-[114px] text-center">
      <div className=" bg-main-yellow fixed top-0 left-0 right-0 z-10 ">
        <div className="layout py-5 md:py-6 flex items-center justify-between">
          <Logo lang={lang} setIsOpen={setIsOpen} />

          <div className="flex items-center  lg:items-center">
            <div className="hidden lg:block text-3xl">
            <LanguageSection lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

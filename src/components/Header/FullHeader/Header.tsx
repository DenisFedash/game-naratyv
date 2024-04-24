"use client";
import { TextHeaderProps } from "@/interfaces/Props.interface";
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageSection from "./LanguageSection/LanguageSection";
import { usePathname } from "next/navigation";
// import burgerMenu from "../../../public/icon/burger-menu.svg";
// import iconClose from "../../../public/icon/icon-close.svg";
import { NavMenu } from "./NavMenu/NavMenu";
import { Logo } from "../../utils/Logo/Logo";

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
              <Link
                href={`/${lang}`}
                className={`mr-9 ${
                  pathName === `/${lang}`
                    ? "border border-main-font-color rounded-lg shadow-3xl px-4 py-2 font-bold"
                    : ""
                }`}
              >
                {textTr.headerMain}
              </Link>
              <Link
                href={`/${lang}/about`}
                className={`mr-9 ${
                  pathName === `/${lang}/about`
                    ? "border border-main-font-color rounded-lg shadow-3xl px-4 py-2 font-bold"
                    : ""
                }`}
              >
                {textTr.headerAbout}
              </Link>
              <Link
                href={`/${lang}/catalog`}
                className={`mr-20 ${
                  pathName === `/${lang}/catalog`
                    ? "border border-main-font-color rounded-lg shadow-3xl px-4 py-2 font-bold"
                    : ""
                }`}
              >
                {textTr.headerCatalog}
              </Link>
            </div>
            <LanguageSection lang={lang} />
            {/* <button type="button" className="lg:hidden ml-4">
              {!isOpen ? (
                <Image
                  src={burgerMenu}
                  alt="burger-menu"
                  width={40}
                  height={40}
                  onClick={() => toggleModal(isOpen)}
                  className="md:w-12 md:h-12"
                />
              ) : ( */}
                 {/* <Image */}
                  {/* src={iconClose}
                   alt="icon-close"
                   width={40}
                   height={40}
                   onClick={() => toggleModal(isOpen)}
                   className="md:w-12 md:h-12"
                 />
              )}
             </button> */}
            <div
              className={
                isOpen
                  ? "bg-main-background w-screen md:w-6/12 md:right-0 md:inset-y-0 h-screen md:h-fit z-10 absolute top-[75px] md:top-[114px] right-0"
                  : "hidden"
              }
            >
              <NavMenu lang={lang} textTr={textTr} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

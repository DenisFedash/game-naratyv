"use client";
import { TextHeaderProps } from "@/interfaces/Props.interface";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
// import iconLinkedin from "/public/icon/linkedin.svg";
import iconUa from "/public/icon/UA.svg";
import iconUk from "/public/icon/UK.svg";
import { usePathname } from "next/navigation";
import { Logo } from "../utils/Logo/Logo";

export const Footer: FC<TextHeaderProps> = ({ textTr, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const path = pathName.slice(4);
  return (
    <div className="bg-main-yellow pt-4 md:pt-6 ">
      <div className="layout">
        <div className=" lg:flex lg:justify-between pb-6 relative">
          <div className="">
            <div className="mb-4 md:mb-6">
              <Logo lang={lang} setIsOpen={setIsOpen} />
            </div>
            {/* <Link
              href="https://www.linkedin.com/company/junfolio/mycompany/"
              className="absolute bottom-[80px] right-[10px] md:top-0 md:right-0 lg:top-52 lg:left-0"
              target="_blank"
            >
              <Image
                src={iconLinkedin}
                alt="linkedin"
                width={40}
                height={40}
                className="md:w-12 md:h-12"
              />
            </Link> */}
          </div>
          {/* <div className="flex items-center md:justify-between">
            <ul className="mr-11 lg:mr-72">
              <li className="text-xs  md:text-2xl mb-4 md:mb-5 md:p-2">
                <Link href={`/${lang}`}>{textTr.footerMain}</Link>
              </li>
              <li className="text-xs  md:text-2xl mb-4 md:mb-5 md:p-2">
                <Link href={`/${lang}/about`}>{textTr.footerAbout}</Link>
              </li>
              <li className="text-xs  md:text-2xl mb-4 md:mb-5 md:p-2">
                <Link href={`/${lang}/catalog`}>{textTr.footerCatalog}</Link>
              </li>
              <li className=" text-xs md:text-2xl md:p-2">
                <Link href={`/${lang}/contacts`}>{textTr.footerContacts}</Link>
              </li>
            </ul>
            <ul>
              <li className="text-xs  md:text-2xl mb-4 md:mb-5 md:p-2">
                <Link href={`/${lang}/partners`}>{textTr.footerPartner}</Link>
              </li>
              <li className="text-xs  md:text-2xl mb-4 md:mb-5 md:p-2">
                <Link href={`/${lang}/connect`}>{textTr.footerConnect}</Link>
              </li>
              <li className="text-xs  md:text-2xl mb-4 md:mb-5 md:p-2">
                <Link href={`/${lang}/privacy`}>{textTr.footerPrivacy}</Link>
              </li>
              <li className=" text-xs md:text-2xl md:p-2">
                <Link href={`/${lang}/participation`}>
                  {textTr.footerConditions}
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        {/* <div className="border-t border-dark-grey py-3 md:py-4 flex justify-between items-center ">
          <p className="text-dark-grey text-xs md:text-2xl ">
            {textTr.footerRights}
          </p>
          <div className="flex">
            <Link
              href={`/ua/${path}`}
              onClick={() => localStorage.setItem("lang", "ua")}
              className={lang === "ua" ? " scale-150" : ""}
            >
              <Image
                src={iconUa}
                alt="ua"
                width={27}
                height={21}
                className="mr-4"
              />
            </Link>
            <Link
              href={`/en/${path}`}
              onClick={() => localStorage.setItem("lang", "en")}
              className={lang === "en" ? " scale-150" : ""}
            >
              <Image src={iconUk} alt="uk" width={27} height={21} />
            </Link>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

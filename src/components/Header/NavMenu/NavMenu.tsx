import Image from "next/image";
import React, { FC } from "react";
import iconHands from "../../../../public/icon/icon-hero3.svg";
import { NavBarFCComponentsProps } from "@/interfaces/Props.interface";
import { pressStart2p } from "@/app/[lang]/fonts";
import Link from "next/link";
import iconLinkedin from "../../../../public/icon/linkedin.svg";
import imageMobileMenu from "../../../../public/img/team-img-menu.png";

export const NavMenu: FC<NavBarFCComponentsProps> = ({
  textTr,
  lang,
  setIsOpen,
}) => {
  return (
    <div className="layout pt-16 md:pt-8 md:w-[430px]">
      <ul className="mb-5 md:mb-6">
        <li className="mb-4" onClick={() => setIsOpen(false)}>
          <Link href={`/${lang}`}>
            <p className="text-2xl text-left pb-3 md:pb-4 pl-0.5 border-b border-main-grey">
              {textTr.headerMain}
            </p>
          </Link>
        </li>
        <li className="mb-4" onClick={() => setIsOpen(false)}>
          <Link href={`/${lang}/about`}>
            <p className="text-2xl text-left pb-3 md:pb-4 pl-0.5 border-b border-main-grey">
              {textTr.headerAbout}
            </p>
          </Link>
        </li>
        <li className="mb-4" onClick={() => setIsOpen(false)}>
          <Link href={`/${lang}/catalog`}>
            <p className="text-2xl text-left pb-3 md:pb-4 pl-0.5 border-b border-main-grey">
              {textTr.headerCatalog}
            </p>
          </Link>
        </li>
        <li className="mb-4" onClick={() => setIsOpen(false)}>
          <Link href={`/${lang}/contacts`}>
            <p className="text-2xl text-left pb-3 md:pb-4 pl-0.5 border-b border-main-grey">
              {textTr.headerContacts}
            </p>
          </Link>
        </li>
        <li className="mb-4" onClick={() => setIsOpen(false)}>
          <Link href={`/${lang}/partners`}>
            <p className="text-2xl text-left pb-3 md:pb-4 pl-0.5 border-b border-main-grey">
              {textTr.headerPartner}
            </p>
          </Link>
        </li>
        <li className="mb-4" onClick={() => setIsOpen(false)}>
          <Link href={`/${lang}/connect`}>
            <p className="text-2xl text-left pb-3 md:pb-4 pl-0.5 border-b border-main-grey">
              {textTr.headerConnect}
            </p>
          </Link>
        </li>
        <li className="mb-4" onClick={() => setIsOpen(false)}>
          <Link href={`/${lang}/privacy`}>
            <p className="text-2xl text-left pb-3 md:pb-4 pl-0.5 border-b border-main-grey">
              {textTr.headerPrivacy}
            </p>
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/participation`}
            onClick={() => setIsOpen(false)}
          >
            <p className="text-2xl text-left px-3 pl-0.5 border-b border-main-grey">
              {textTr.headerConditions}
            </p>
          </Link>
        </li>
      </ul>
      <Link
        href="https://www.linkedin.com/company/junfolio/mycompany/"
        target="_blank"
        onClick={() => setIsOpen(false)}
      >
        <Image
          src={iconLinkedin}
          alt="linkedin"
          width={40}
          height={40}
          className="ml-9 md:ml-0 mb-5 md:mb-11 md:w-12 md:h-12"
        />
      </Link>
      <Image
        src={imageMobileMenu}
        alt="menu-logo"
        width={337}
        height={240}
        className="md:hidden"
      />
    </div>
  );
};

import Image from "next/image";
import React from "react";
import iconGroup from "../../../../public/icon/group.svg";
import iconWarning from "../../../../public/icon/icon-warning.svg";
import { pressStart2p } from "@/app/[lang]/fonts";
import Link from "next/link";
import { SecondBtn } from "../SecondBtn/SecondBtn";

export const ErrorSite = () => {
  return (
    <div className="my-14 layout relative">
      <div className="mb-32  flex justify-center">
        <div className="w-[930px] h-[450px] bg-main-white border-4 rounded-lg shadow-3xl">
          <div className="flex items-center justify-between px-6 py-2 border-b-4 shadow-3xl bg-main-yellow">
            <h1 className={`text-3xl ${pressStart2p.className}`}>Error</h1>
            <Image src={iconGroup} alt="icon-group" width={162} height={46} />
          </div>
        </div>
        <div className="w-[930px] h-[450px] bg-main-white border-4 rounded-lg shadow-3xl absolute top-9 left-[300px]">
          <div className="flex items-center justify-between px-6 py-2 border-b-4 shadow-3xl bg-main-yellow">
            <h1 className={`text-3xl ${pressStart2p.className}`}>Error</h1>
            <Image src={iconGroup} alt="icon-group" width={162} height={46} />
          </div>
        </div>
        <div className="w-[930px] h-[450px] bg-main-white border-4 rounded-lg shadow-3xl absolute top-[72px] left-[345px]">
          <div className="flex items-center justify-between px-6 py-2 border-b-4 shadow-3xl bg-main-yellow">
            <h1 className={`text-3xl ${pressStart2p.className}`}>Error</h1>
            <Image src={iconGroup} alt="icon-group" width={162} height={46} />
          </div>
          <div className="flex items-center justify-center pt-28">
            <Image src={iconWarning} alt="warning" width={180} height={158} />
            <div className="ml-14">
              <p className={`text-8xl ${pressStart2p.className}`}>404</p>
              <p className="text-3xl">Щось пішло не так</p>
            </div>
          </div>
        </div>
      </div>
      <Link href={`/`}>
        <SecondBtn className="ml-auto mr-auto" text="На головну" />
      </Link>
    </div>
  );
};

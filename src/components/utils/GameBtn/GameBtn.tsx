import Link from "next/link";
import { FC } from "react";
import { BtnProps } from "@/interfaces/Props.interface";

export const GameBtn: FC<BtnProps> = ({ text, lang, className, children}) => {
    return (
         <Link href={`/${lang}`}>
              <div className={`text-center text-2xl py-5 font-bold ${className}`}>
              {children || text}
              </div>
            </Link>
    )
}


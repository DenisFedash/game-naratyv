"use client";

import { FC } from "react";
import { BtnProps } from "@/interfaces/Props.interface";
import { useRouter } from "next/navigation";

export const BtnGoBackComponent:FC<BtnProps> = ({lang, className, text, children }) => {
    const router = useRouter();
    return ( 
        <>
            <button onClick={() => router.back()} lang={lang} 
            className={`placeholder:border w-[343px] rounded-lg shadow-3xl h-[84px] ml-auto mr-auto text-3xl font-bold hover:bg-orange bg-main-yellow ${className}`}>
            {children || text}
            </button>
        </>
    );
};

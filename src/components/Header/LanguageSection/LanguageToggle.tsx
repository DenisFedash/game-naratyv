"use client";
import { LangFCComponentsProps } from "@/interfaces/Props.interface";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const LanguageToggle: FC<LangFCComponentsProps> = ({ lang }) => {
  const pathName = usePathname();
  const path = pathName.slice(4);
  return (
    <div>
      <Link
        href={`/ua/${path}`}
        onClick={() => localStorage.setItem("lang", "ua")}
        className={
          lang === "ua"
            ? "text-xs border border-main-font-color rounded-lg shadow-3xl font-bold"
            : "text-xs"
        }
      >
        UA
      </Link>
      <span className="mx-2 text-3xl">/</span>
      <Link
        href={`/en/${path}`}
        onClick={() => localStorage.setItem("lang", "en")}
        className={
          lang === "en"
            ? "text-xs border border-main-font-color rounded-lg shadow-3xl font-bold"
            : "text-xs"
        }
      >
        EN
      </Link>
    </div>
  );
};

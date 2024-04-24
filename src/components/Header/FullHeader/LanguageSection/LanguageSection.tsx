"use client";
import { LangFCComponentsProps } from "@/interfaces/Props.interface";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LanguageSection: FC<LangFCComponentsProps> = ({ lang }) => {
  const pathName = usePathname();
  const path = pathName.slice(4);

  const isUaSelected = lang === "ua";
  const isEnSelected = lang === "en";

  return (
    <div>
      <Link
        href={`/ua/${path}`}
        onClick={() => {
          if (!isUaSelected) {
            localStorage.setItem("lang", "ua");
          }
        }}
        className={
          isUaSelected
            ? "text-sm md:text-3xl border border-main-font-color rounded-lg shadow-3xl font-bold cursor-default p-1"
            : "text-sm md:text-3xl p-1"
        }
        scroll={false}
      >
        UA
      </Link>
      <span className="mx-2 text-sm md:text-3xl">/</span>
      <Link
        href={`/en/${path}`}
        onClick={() => {
          if (!isEnSelected) {
            localStorage.setItem("lang", "en");
          }
        }}
        className={
          isEnSelected
            ? "text-sm md:text-3xl border border-main-font-color rounded-lg shadow-3xl font-bold cursor-default p-1"
            : "text-sm md:text-3xl p-1"
        }
        scroll={false}
      >
        EN
      </Link>
    </div>
  );
};

export default LanguageSection;

import React, { FC } from "react";
import { getDictionary } from "../dictionaries";
import { GalleryComponent } from "@/components/GalleryComponent/GalleryComponent";

const Gallery = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = await getDictionary(lang);
  return <GalleryComponent textTr={dict.gallery} lang={lang} />;
};

export default Gallery;

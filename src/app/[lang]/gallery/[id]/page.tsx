import React from "react";
import { getDictionary } from "../../dictionaries";
import { GalleryItem } from "@/components/GalleryComponent/GalleryItem";

const GalleryItemPage = async ({
  params: { lang, id },
}: {
  params: { lang: string; id: string };
}) => {
  const dict = await getDictionary(lang);
  return <GalleryItem lang={lang} id={id} textTr={dict.gallery} />;
};

export default GalleryItemPage;

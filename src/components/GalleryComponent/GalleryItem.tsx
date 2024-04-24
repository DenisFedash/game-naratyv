"use client";

import { GalleryComponentsPropsId } from "@/interfaces/Props.interface";
import React, { FC, useEffect, useState } from "react";
// import dataGallery from "../../../public/data/dataGallery.json";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import { IconLike } from "../utils/iconLike/iconLike";
import { useLikes } from "../utils/LikesContext/LikesContext";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";
import Link from "next/link";
import { getGalleryItem } from "@/app/(server)/api/gallery-item/data";

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

export const GalleryItem: FC<GalleryComponentsPropsId> = ({
  textTr,
 id,
  lang,
}) => {
  const [oneGallery, setOneGallery] = useState();
  const { likedItems, setLikedItems } = useLikes();

  const handleLike = () => {
    const isLiked = likedItems.includes(oneGallery.gallery_uuid);
    const updatedLikedItems = isLiked
      ? likedItems.filter((likedId) => likedId !== oneGallery.gallery_uuid)
      : [...likedItems, oneGallery.gallery_uuid];

    setLikedItems(updatedLikedItems);
  };

  useEffect(() => {
    getGalleryItem(id).then(data => {
      setOneGallery(data);
      console.log(oneGallery);
    });
  }, []);

  return (
    <div className="layout py-24">
      {oneGallery ? (
        <>
          <h1 className={`text-3xl text-center mb-7 ${pressStart2p.className}`}>
            {oneGallery.topic}
          </h1>
          <p className="text-3xl text-center mb-7">
            {oneGallery.team_name}
          </p>
          <div className="flex justify-center bg-main-white mb-9">
            <Image
              src={`http://localhost:80/${oneGallery.photo}`}
              alt="main-img"
              width={1280}
              height={485}
            />
          </div>
          <p className="text-3xl text-justify overflow-y-scroll h-[319px] mb-14">
               {oneGallery.text}
          </p>
          <div className="flex items-center mb-24">
             <IconLike
              onLikeClick={handleLike}
              id={oneGallery.gallery_uuid}
              isLiked={likedItems.includes(oneGallery.gallery_uuid)}
            /> 
            <p className="text-3xl ml-2.5 ">{textTr.galleryLike}</p>
          </div>
          <Link href={`/${lang}/gallery`}>
            <SecondBtn className="ml-auto mr-auto" text={textTr.galleryItemBtn} />
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
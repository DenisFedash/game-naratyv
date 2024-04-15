"use client";
import { GalleryComponentsPropsId } from "@/interfaces/Props.interface";
import React, { FC, useEffect, useState } from "react";
import dataGallery from "../../../public/data/dataGallery.json";
import { pressStart2p } from "@/app/[lang]/fonts";
import Image from "next/image";
import { IconLike } from "../utils/iconLike/iconLike";
import { useLikes } from "../utils/LikesContext/LikesContext";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";
import Link from "next/link";

export const GalleryItem: FC<GalleryComponentsPropsId> = ({
  textTr,
  id,
  lang,
}) => {
  const { likedItems, setLikedItems } = useLikes();
  const gallery = dataGallery.filter((elem: any) => elem.id === id);
  const oneGallery = gallery[0];

  const handleLike = () => {
    const isLiked = likedItems.includes(oneGallery.id);
    const updatedLikedItems = isLiked
      ? likedItems.filter((likedId) => likedId !== oneGallery.id)
      : [...likedItems, oneGallery.id];

    setLikedItems(updatedLikedItems);
  };

  return (
    <div className="layout py-24">
      <h1 className={`text-3xl text-center mb-7 ${pressStart2p.className}`}>
        {lang === "ua" ? oneGallery.gameNameUa : oneGallery.gameNameEn}
      </h1>
      <p className="text-3xl text-center mb-7">
        {lang === "ua" ? oneGallery.teamNameUa : oneGallery.teamNameEn}
      </p>
      <div className="flex justify-center bg-main-white mb-9">
        <Image
          src={oneGallery.mainImg}
          alt="main-img"
          width={1280}
          height={485}
        />
      </div>
      <p className="text-3xl text-justify overflow-y-scroll h-[319px] mb-14">
        {lang === "ua" ? oneGallery.textUa : oneGallery.textEn}
      </p>
      <div className="flex items-center mb-24">
        <IconLike
          onLikeClick={handleLike}
          id={oneGallery.id}
          isLiked={likedItems.includes(oneGallery.id)}
        />
        <p className="text-3xl ml-2.5 ">{textTr.galleryLike}</p>
      </div>
      <Link href={`/${lang}/gallery`}>
        <SecondBtn className="ml-auto mr-auto" text={textTr.galleryItemBtn} />
      </Link>
    </div>
  );
};

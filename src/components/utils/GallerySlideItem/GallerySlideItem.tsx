"use client";

import React, { FC, useEffect} from "react";
import { GalleryComponentsPropsId } from "@/interfaces/Props.interface";
import { useLikes } from "../LikesContext/LikesContext";
import Image from "next/image";
import Link from "next/link";
import dataGallery from "../../../../public/data/dataGallery.json";
import { IconLike } from "../iconLike/iconLike";
import iconMove from "../../../../public/icon/icon-move.svg";

export const GallerySlideItem: FC<GalleryComponentsPropsId> = ({ lang }) => {
  const { likedItems, setLikedItems } = useLikes();

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedItems");
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      setLikedItems(parsedLikes);
    }
  }, []);

  const handleLike = (id: string) => {
    const isLiked = likedItems.includes(id);
    const updatedLikedItems = isLiked
      ? likedItems.filter((likedId) => likedId !== id)
      : [...likedItems, id];

    localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
    setLikedItems(updatedLikedItems);
  };

  return ( 
      <ul>
        {dataGallery
          .map(
            ({ id, img, gameNameEn, gameNameUa, teamNameEn, teamNameUa }) => (
              <li
                key={id}
                className="bg-main-white relative rounded-lg border border-main-yellow"
              >
                <Image
                  src={img}
                  alt="image-gallery"
                  width={219}
                  height={240}
                  className="mx-24 my-3.5"
                />
                <div className="px-0 absolute bottom-0 left-0 bg-main-white w-full text-center rounded-b-lg border-t border-t-main-yellow">
                  <h2 className="mb-1 text-xl font-bold">
                    {lang === "ua" ? gameNameUa : gameNameEn}
                  </h2>
                  <p className="text-xl mb-1.5">
                    {lang === "ua" ? teamNameUa : teamNameEn}
                  </p>
                  <button
                    onClick={() => handleLike(id)}
                    className="absolute bottom-0 left-0"
                  >
                    <IconLike
                      onLikeClick={handleLike}
                      id={id}
                      isLiked={likedItems.includes(id)}
                    />
                  </button>
                </div>
                 <Link href={`/${lang}/gallery/${id}`}> 
                  <div className=" absolute top-0 right-0 bg-icon-move-color p-2 rounded">
                    <Image
                      src={iconMove}
                      alt="icon-move"
                      width={24}
                      height={24}
                    />
                  </div>
                 </Link> 
              </li>
            )
          )}
      </ul>
  );
};


"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { TextHeaderProps } from "@/interfaces/Props.interface";
import { pressStart2p } from "@/app/[lang]/fonts";
import { IconLike } from "../utils/iconLike/iconLike";
import iconMove from "../../../public/icon/icon-move.svg";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";
import Link from "next/link";
import { useLikes } from "../utils/LikesContext/LikesContext";
import { getGallery } from "@/app/(server)/api/gallery/data";

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

export const GalleryComponent: FC<TextHeaderProps> = ({ textTr, lang }) => {
  const itemsPerPage = 6;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const { likedItems, setLikedItems } = useLikes();
  const [dataGallery, setDataGallery] = useState([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedItems");
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      setLikedItems(parsedLikes);
    }
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
     try {
       const gallery = await getGallery(); 
       setDataGallery(gallery)
     } catch (error) {
       console.log("error fetching gallery:", error)
     }
    };
    fetchGallery();
   }, []);

  const handleLike = (id: string) => {
    const isLiked = likedItems.includes(id);
    const updatedLikedItems = isLiked
      ? likedItems.filter((likedId) => likedId !== id)
      : [...likedItems, id];

    localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
    setLikedItems(updatedLikedItems);
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const hasMoreItems = visibleItems < dataGallery.length;

  return (
    <div className="layout my-24">
      <h1 className={`text-3xl text-center mb-9 ${pressStart2p.className}`}>
        {textTr.galleryTitle}
      </h1>
      <ul className="grid grid-cols-3 gap-4 justify-items-center mb-12">
        {dataGallery
          .slice(0, visibleItems)
          .map(
            ({ gallery_uuid, photo, topic, team_name }) => (
              <li
                key={gallery_uuid}
                className="bg-main-white relative rounded-lg border border-main-yellow"
              >
                <Image
                  src={`http://localhost:80/${photo}`}
                  alt="image-gallery"
                  width={219}
                  height={240}
                  className="mx-24 my-3.5 w-[219px] h-[240px]"
                />
                <div className="px-0 absolute bottom-0 left-0 bg-main-white w-full text-center rounded-b-lg border-t border-t-main-yellow">
                  <h2 className="mb-1 text-xl font-bold">
                    {topic}
                  </h2>
                  <p className="text-xl mb-1.5">
                    {team_name}
                  </p>
                  <button
                    onClick={() => handleLike(gallery_uuid)}
                    className="absolute bottom-0 left-0"
                  >
                    <IconLike
                      onLikeClick={handleLike}
                      id={gallery_uuid}
                      isLiked={likedItems.includes(gallery_uuid)}
                    />
                  </button>
                </div>
                <Link href={`/${lang}/gallery/${gallery_uuid}`}>
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
      {hasMoreItems && (
        <div className="text-center text-3xl font-bold text-main-yellow mb-12">
          <button onClick={loadMore}>Завантажити ще</button>
        </div>
      )}
      <Link href={`/${lang}/rules/naratyv-creatyv`}>
        <SecondBtn className="ml-auto mr-auto" text={textTr.galleryBtn} />
      </Link>
    </div>
  );
};

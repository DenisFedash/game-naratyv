"use client";

import React, { FC, useEffect, useState} from "react";
import { GalleryComponentsPropsId } from "@/interfaces/Props.interface";
import { useLikes } from "../LikesContext/LikesContext";
import Image from "next/image";
import Link from "next/link";
import dataGallery from "../../../../public/data/dataGallery.json";
import { IconLike } from "../iconLike/iconLike";
import iconMove from "../../../../public/icon/icon-move.svg";
import { getGallery } from "@/app/(server)/api/gallery/data";

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

export const GallerySlideItem: FC<GalleryComponentsPropsId> = ({ lang }) => {
  const [gallery, setGallery] = useState([]);
  const { likedItems, setLikedItems } = useLikes();

  useEffect(() => {
    const fetchGallery = async () => {
     try {
       const galleryItems = await getGallery(); 
       setGallery(galleryItems);
     } catch (error) {
       console.log("error fetching gallery:", error)
     }
    };
    fetchGallery();
   }, []);

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
        {gallery.map(({ gallery_uuid, photo, topic, team_name }) => (
              <li
                key={gallery_uuid}
                className="bg-main-white relative rounded-lg border border-main-yellow"
              >
                <Image
                  src={`http://localhost:80/api/v1/${photo}`}
                  alt="image-gallery"
                  width={219}
                  height={240}
                  className="mx-24 my-3.5"
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
  );
};
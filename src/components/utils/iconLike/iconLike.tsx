"use client";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { FC, useEffect, useState } from "react";
import { IconLikeProps } from "@/interfaces/Props.interface";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const IconLike: FC<IconLikeProps> = ({ onLikeClick, id, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLikeClick = () => {
    onLikeClick(id);
    setLiked(!liked);
  };

  return (
    <div>
      <Checkbox
        {...label}
        checked={liked}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        onClick={handleLikeClick}
      />
    </div>
  );
};

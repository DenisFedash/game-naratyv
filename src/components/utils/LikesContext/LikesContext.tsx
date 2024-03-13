"use client";
import {
  LikesContextProps,
  LikesProviderProps,
} from "@/interfaces/Props.interface";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

const LikesContext = createContext<LikesContextProps | undefined>(undefined);

export const LikesProvider: FC<LikesProviderProps> = ({ children }) => {
  const [likedItems, setLikedItems] = useState<string[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedItems");
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      setLikedItems(parsedLikes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  return (
    <LikesContext.Provider value={{ likedItems, setLikedItems }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
};

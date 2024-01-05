
import { Dispatch, SetStateAction, ReactNode } from "react";

import { GameData, SORT_OPTIONS } from "@/api/games/gamesApi";


export interface TextFCComponentsProps {
  textTr: {
    [key: string]: any;
  };
}

export interface LangFCComponentsProps {
  lang: string;
}

export interface TextHeaderProps {
  lang: string;
  textTr: {
    [key: string]: any;
  };
}

export interface StatisticProps {
  textTr: {
    [key: string]: any;
  };
  games: string;
  playing: string;
  teams: string;
}

export interface BtnProps {
  text: string;
}

export interface MainBtnProps {
  text: string;
  gameData?: {isActive: boolean}
}

export interface NavBarFCComponentsProps {
  lang: string;
  textTr: {
    [key: string]: any;
  };
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LogoFCComponentsProps {
  lang: string;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SliderButtonProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  lang: string;
}

export interface SortButtonsProps {
  onSortChange: (sortOption: SORT_OPTIONS) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  textTr: {
    [key: string]: any;
  };
}


export interface GalleryItem {
 id: string;
  img: string;
  gameNameEn: string;
  gameNameUa: string;
  teamNameEn: string;
  teamNameUa: string;
  likes: number;
  iconLike: string;
  iconLikeFill: string;
  [key: string]: any;
}
export interface GalleryListProps{
    lang: string;
    textTr: {
      [key: string]: any;     
    };
  dataGallery: {
       id: string;
  img: string;
  gameNameEn: string;
  gameNameUa: string;
  teamNameEn: string;
  teamNameUa: string;
    likes: number;
    iconLike: string;
    iconLikeFill: string;
    
    }  
}
 
export interface LikedItems {
  [key: string]: boolean;
}

export interface IconLikeProps {
  onLikeClick: (id: string) => void;
  id: string;
  isLiked: boolean;
 
}

export interface GalleryComponentsPropsId { 
   lang: string;
  textTr: {
    [key: string]: any;
  };

  id: string;
}


export interface GameCardProps {
  lang: string;
  textTr: {
    [key: string]: any;
  };
  gameData: GameData;
}

export interface LikesContextProps {
  likedItems: string[];
  setLikedItems: Dispatch<SetStateAction<string[]>>;
}

export interface LikesProviderProps {
  children: ReactNode;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}






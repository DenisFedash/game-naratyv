
import { Dispatch, SetStateAction, ReactNode, MutableRefObject } from "react";

import { GameData, SORT_OPTIONS } from "@/app/(server)/api/catalog/gamesApi"; 


export interface TextFCComponentsProps {
  textTr: {
    [key: string]: any;
  };
  lang?: string;
  role?: string;
  id?: string;
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
  text?: string;
  lang?: string;
  className?: string;
  btnWidth?: string;
  onClick?: () => void; 
  children?: any; 
  textTr?: {
    [key: string]: any;
  };
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
  lang?: string;
  textTr: {
   [key: string]: any;
   id?: string; 
   role?: string;
   lang?: string; 
 };
  data?: {
  [key: string]: any;
};
  id?: string,
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

export interface RulesComponentProps {
  role?: string;
  textTr: {
    [key: string]: any;
  };
  lang: string;
  params?: any; 
  id?: string; 
}

export interface RulesBtnProps {
  lang: string;
  textTr: {
    [key: string]: any;
  };
  id: string; 
  className?: string;
}

export interface GameComponentProps {
  lang: string;
  textTr?: {
    [key: string]: any;
    lang: string; 
    id: string;
  };
  gameData?: GameData;
  id?: string;
}

export interface GameTopicProps {
  lang?: string;
  textTr?: {
    [key: string]: any;
  };
  isOpen: boolean; 
  onTopicSelect: (topic: string) => void;
  ref: MutableRefObject<null>;
  id?: string;
  newTopic?: string,
  topic?: string
}

export interface GameTopicListProps {
  gameTopics: string [];
  addGameTopic: (newTopic: string) => void;
  onTopicClick: (topic: string) => void;
}

export interface ModalProps {
  ref?: MutableRefObject<null>;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export interface PlayerData {
  username: string; 
}

export interface GameTopicComponentProps {
  gameTopics: string[];
  addGameTopic: (newTopic: string) => void;
  onTopicClick: (topic: string) => void;
  maxLength: number;
}

export interface NumberOfTeamProps {
  lang: string;
  sessionIdentificator: string;
}
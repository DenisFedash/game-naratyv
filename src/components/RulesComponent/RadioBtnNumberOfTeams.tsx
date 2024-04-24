"use client";

import { useState, FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import iconClick from "../../../public/icon/icon-click.svg";
import { postGameSession } from "@/app/(server)/api/game-session/data";
import { NumberOfTeamProps } from "@/interfaces/Props.interface";
import { useTeamsStore } from "./TeamsContext";
import closeBtn from "../../../public/icon/icon-close-radiogroup.svg";

export const NumberOfTeams: FC<NumberOfTeamProps> = ({ lang }) => {
  const [isOpenForm, setIsOpenForm] = useState(true); 

  const options = [
      { label: "2 команди (рекомендовано для гри з кількістю учасників 8-12)", team_min: 1, team_max: 1, team_players_min: 1, team_players_max: 1 },
      { label: "3 команди (рекомендовано для гри з кількістю учасників 13-18)", team_min: 3, team_max: 3, team_players_min: 13, team_players_max: 18 },
      { label: "4 команди (рекомендовано для гри з кількістю учасників 19-22)", team_min: 4, team_max: 4, team_players_min: 19, team_players_max: 22 }
  ];

  const [selectedValue, setSelectedValue] = useState(options[0]);
  const { sessionIdentificator, setSessionIdentificator } = useTeamsStore();

  const handleChange = (event: any) => {
      setSelectedValue(options[event.target.value]);
  };

  const closeForm = () => {
    setIsOpenForm(false);
  };

  const router = useRouter();

  const handleSubmit = () => {
    document.cookie = "name=value; SameSite=None";
      postGameSession(
        selectedValue.team_min, 
        selectedValue.team_max, 
        selectedValue.team_players_min, 
        selectedValue.team_players_max)
          .then((data) => {
            console.log("data:", data);
              setSessionIdentificator(data);
              // router.push(`/${lang}/create-game`);
              router.push("/ua/create-game");
          })
          .catch((error) => {
              console.error("Data retrieval error:", error);
          });
  };

  return (
    <>
    {isOpenForm && (
    <div className="fixed top-0 left-0 w-full h-full bg-modal-bg z-20">
    <div className="flex flex-col items-end z-30 absolute top-0 left-0 rounded-lg w-[890px] h-[442px] mt-[200px] pt-5 pr-5 ml-auto mr-auto bg-main-background" 
    style={{
      left: "50%",
      transform: "translate(-50%, 0)",
    }}>
      <Image
      src={closeBtn}
      alt="close"
      width={20}
      height={20}
      className="mb-10 cursor-pointer" onClick={closeForm}/>
      <div className="ml-auto mr-auto">
      <p className="text-center font-bold text-3xl mb-10">Оберіть кількість команд</p>
      {options.map((option, index) => (
        <div key={index} className="mb-6 last:mb-0">
      <label className="cursor-pointer  checked:bg-main-yellow">
        <input
          type="radio"
          name="teamNumber"
          value={index}
          checked={selectedValue === option}
          onChange={handleChange}
          className="relative w-5 h-5"
        />
        {/* <div className="absolute w-3 h-3 rounded-full bg-radio-btn-bg mt-[-2%] ml-[1.1%] transform -translate-x-1/2 -translate-y-1/2">
</div> */}
        <span className="ml-4 text-2xl">{option.label}</span>
      </label>
      </div>
    ))}
    <div onClick={handleSubmit} className="ml-auto mr-auto border border-main-font-color rounded-lg cursor-pointer mt-10 shadow-3xl font-bold flex items-center w-64 h-12 bg-main-white hover:bg-orange focus:outline-none transform transition-transform duration-200 ease-in-out active:scale-90">
        <div className="flex items-center justify-center w-[382px] h-12 border-r-2 border-gray-300">
          <p className="text-2xl font-bold">
            Створити гру
          </p>
        </div>
        <div className="flex items-center justify-center w-[84px] h-12 bg-main-yellow p-2.5 rounded-r-lg">
          <Image
            src={iconClick}
            alt="icon-click"
            width={20}
            height={20}
            className="md:w-12 md:h-12"
          />
          </div>
        </div>
      </div>
    </div>
  </div>
   )}
  </>
  );
};
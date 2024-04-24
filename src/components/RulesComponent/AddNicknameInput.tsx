"use client";

import { useState, FC } from "react";
import { RulesComponentProps } from "@/interfaces/Props.interface";
import { savePlayersName } from "@/app/(server)/api/players/data";



export const AddNicknameInput: FC<RulesComponentProps> = ({ textTr }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      savePlayersName({ username: name });
      setName("");
    } catch (error) {
      console.error("Failed to save player name:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={textTr.rulePlayerAddNicknameInput}
        className="w-[550px] h-[84px] border border-main-font-color rounded-lg shadow-3xl bg-main-white bg-keyboard bg-no-repeat bg-[center_left_1rem] flex text-3xl pl-32 ml-auto mr-auto"
      />
    </form>
  );
};



"use client";

import { useState } from "react";
import { NumberOfTeams } from "./RadioBtnNumberOfTeams";
import { useTeamsStore } from "./TeamsContext";
import { SecondBtn } from "../utils/SecondBtn/SecondBtn";

export const RulesAdminBtn = ({textTr, lang}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedValue, setSelectedValue } = useTeamsStore();


    const toggleForm = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div >
        <SecondBtn onClick={toggleForm} btnWidth="w-[550px]" className="flex items-center mb-24 text-4xl font-bold text-main-grey bg-main-white ml-auto mr-auto">
        {textTr.createGameBtn} 
      </SecondBtn>
      {isOpen && <NumberOfTeams selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>}
       </div>
    )
}

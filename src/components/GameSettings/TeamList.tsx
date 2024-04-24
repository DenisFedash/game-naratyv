"use client"
import { FC, useEffect, useState } from "react";
import { useTeamsStore } from "../RulesComponent/TeamsContext";
import { addPlayersInGame } from "@/app/(server)/api/game-session/data";



export const RulesActivePlayer = () => {
    const { sessionIdentificator, setSessionIdentificator } = useTeamsStore() && {};

  
    useEffect(() => {
      if (sessionIdentificator) {
        console.log('sessionIdentificator:', sessionIdentificator);
        addPlayersInGame(sessionIdentificator);
      }
    }, [sessionIdentificator]);

    
    return (
        <div>Hello</div>
    )
}    



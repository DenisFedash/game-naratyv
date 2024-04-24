"use client";

import { createContext, useState,  useEffect, useContext} from "react";

export const TeamsContext = createContext(null);

export const TeamProvider = ({ children }) => {

  const options = [
    { label: "2 команди (рекомендовано для гри з кількістю учасників 8-12)", team_min: 2, team_max: 2, team_players_min: 8, team_players_max: 12 },
    { label: "3 команди (рекомендовано для гри з кількістю учасників 13-18)", team_min: 3, team_max: 3, team_players_min: 13, team_players_max: 18 },
    { label: "4 команди (рекомендовано для гри з кількістю учасників 19-22)", team_min: 4, team_max: 4, team_players_min: 19, team_players_max: 22 }
];
  const [sessionIdentificator, _setSessionIdentificator] = useState();
  const [players, setPlayers] = useState();
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [serverMessage, setServerMessage] = useState("");
 
  const setSessionIdentificator = (newSessionIdentificator) => {
    _setSessionIdentificator(newSessionIdentificator);
    localStorage.setItem("sessionIdentificator", newSessionIdentificator); 
  };

 
  useEffect(() => {
    const storedSessionIdentificator = localStorage.getItem("sessionIdentificator"); 
    if (storedSessionIdentificator) {
      _setSessionIdentificator(storedSessionIdentificator);
    }
  }, []);

  return (
    <TeamsContext.Provider 
       value={{ 
        sessionIdentificator, 
        setSessionIdentificator, 
        players, 
        setPlayers, 
        selectedValue, 
        setSelectedValue,
        serverMessage, 
        setServerMessage 
        }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeamsStore = () => useContext(TeamsContext);
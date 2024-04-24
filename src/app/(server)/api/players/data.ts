import { PlayerData } from "../../../../interfaces/Props.interface";

// Saving a player in a game session

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

export const savePlayersName = async ({ username }: PlayerData) => {
  try {
    const data = new URLSearchParams();
    data.append("username", username);
    const response = await fetch("http://localhost:80/player/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    });
    if (!response.ok) {
      throw new Error("Player name could not be saved");
    }

    const responseData = await response.json();
    console.log("Received response:", responseData); 
    return responseData;
  } catch (error) {
    console.error("Error saving player name:", error);
    throw error;
  }
};


// Getting all player nicknames

  export const getAllPlayersNames = async () => {
    try {
      const response = await fetch("http://localhost:80/player/", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to get player names");
      } 
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
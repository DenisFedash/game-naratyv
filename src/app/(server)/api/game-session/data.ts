// Creating a game session

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

export const postGameSession = async (
  team_min, 
  team_max, 
  team_players_min, 
  team_players_max) => {
  try {
    const data = {
      "team_min": team_min,
      "team_max": team_max,
      "team_players_min": team_players_min,
      "team_players_max": team_players_max,
    }

    const formData = new URLSearchParams();
    for(const key in data) {
      formData.append(key, data[key]);
    }

    const response = await fetch(
      "http://localhost:80/api/v1/game_session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    const responseData = await response.json();
    console.log("Received response:", responseData);   
    const sessionIdentificator = responseData.data.session_identificator;
    return sessionIdentificator
    
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Adding players to the game session

export const addPlayersInGame = async (session_identificator) => {
  try {
    const data = new URLSearchParams();
    data.append("session_identificator", session_identificator);
    const response = await fetch(
      `http://localhost:80/api/v1/game_session/${session_identificator}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    });

    if (!response.ok) {
      throw new Error("Unable to add a player");
    }
    const responseData = await response.json();
    console.log("Received response:", responseData); 
    return responseData;
  } catch (error) {
    console.error("Error saving player:", error);
    throw error;
  }
};


// Getting all the players in a game session

export const getGameSession = async (sessionIdentificator) => {
  try {
    const response = await fetch(
     `http://localhost:80/api/v1/game_session/${sessionIdentificator}`, {
      method: "GET",
     });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log("Received response:", responseData);   
    const teamList = responseData.data;
    console.log("teamList:", teamList);
    return teamList;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
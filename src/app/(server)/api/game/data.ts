// Getting the game 

const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

export const getGame = async () => {
    const uuid = "af2ea118-abd1-434d-848c-dd578979c5b9";
    try {
      const response = await fetch(
       `http://localhost:80/game_info/${uuid}`, {
        method: "GET",
       });
      if (!response.ok) {
        throw new Error("Unable to get game data");
      }
      const responseData = await response.json();
      console.log("Received response:", responseData);   
      const game = responseData.data;
      console.log("game:", game);
      return game;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
// Getting all the games 


export const getGameCatalog = async () => {
    try {
      const response = await fetch(
        "http://localhost:80/game_info/all", {
        method: "GET",
       });
      if (!response.ok) {
        throw new Error("Unable to get game data");
      }
      const responseData = await response.json();
      console.log("Received response:", responseData);   
      const catalog = responseData.data;
      console.log("catalog:", catalog);
      return catalog;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };


  
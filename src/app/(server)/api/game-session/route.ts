import { NextResponse } from "next/server";
import { postGameSession } from "./data";
import { getGameSession } from "./data";
import { addPlayersInGame } from "./data";


  export const POST = async () => {
    const team_min = "team_min";
    const team_max = "team_max";
    const team_players_min = "team_players_min";
    const team_players_max = "team_players_max";
    
    const session = await postGameSession(
      team_min,
      team_max, 
      team_players_min, 
      team_players_max
    );
    return NextResponse.json(session);
  };
  

  export const PUT = async (req) => {
    try {
      const players = await addPlayersInGame(req.body);
      return NextResponse.json(players);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  export const GET = async (sessionIdentificator) => {
    const team = await getGameSession(sessionIdentificator); 
    return NextResponse.json(team);
  };



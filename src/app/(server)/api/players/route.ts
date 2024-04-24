import { NextResponse } from "next/server";
import { PlayerData } from "../../../../interfaces/Props.interface";
import { savePlayersName } from "./data";
import { getAllPlayersNames } from "./data";

export const PUT = async (req) => {
  try {
    const players = await savePlayersName(req.body);
    return NextResponse.json(players);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  export const GET = async () => {
    const players = await getAllPlayersNames();
    return NextResponse.json(players);
  };


import { NextResponse } from "next/server";
import { getGame } from "./data";

export const GET = async () => {
    const game = await getGame("af2ea118-abd1-434d-848c-dd578979c5b9");
    return NextResponse.json(game);
}
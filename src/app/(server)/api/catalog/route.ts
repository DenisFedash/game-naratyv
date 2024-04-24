import { NextResponse } from "next/server";
import { getGameCatalog } from "./data";


export const GET = async () => {
    const catalog = await getGameCatalog();
    return NextResponse.json(catalog);
}


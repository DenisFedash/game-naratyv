import { NextResponse } from "next/server";
import { getAllRules} from "./data";

export const GET = async () => {
    const rules = await getAllRules();
    return NextResponse.json(rules);
}









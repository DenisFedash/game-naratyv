import { NextResponse } from "next/server";
import { getAllGallery} from "./data";

export const GET = async () => {
    const pictures = await getAllGallery();
    return NextResponse.json(pictures);
}
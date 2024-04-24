import { NextResponse } from "next/server";
import { getGalleryItem } from "./data";


export const GET = async () => {
    const gallery_uuid = "fc40c7ac-3420-4b46-982e-aaac5fde0e94";
    const item = await getGalleryItem(gallery_uuid);
    return NextResponse.json(item )
}
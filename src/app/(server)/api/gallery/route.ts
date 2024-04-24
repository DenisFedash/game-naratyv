import { NextResponse } from "next/server";
import { getGallery} from "./data";
import { postGallery } from "./data";

 export const GET = async () => {
     const gallery = await getGallery();
     return NextResponse.json(gallery);
 }


 export const POST = async () => {
    const topic = "topic";
    const photo_jpeg = new Blob(); 
    const text = "text";
    const team_name = "team_name";
    const game_uuid = "af2ea118-abd1-434d-848c-dd578979c5b9";
  
    const pictures = await postGallery(topic, text, photo_jpeg, team_name, game_uuid);
    return NextResponse.json(pictures)
  }
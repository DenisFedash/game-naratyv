import data from "../../../../../public/data/dataGallery.json";


 export const getAllGallery = async () => {
     return data;
 }

 export const getPictureById = async (id: string) => {
     return data.find((picture) => picture.id === id);
 }
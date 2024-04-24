
const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

export const getGalleryItem = async (gallery_uuid) => {
  // const gallery_uuid = "fc40c7ac-3420-4b46-982e-aaac5fde0e94";
    try {
      const response = await fetch(
       `http://localhost:80/api/v1/gallery/item/${gallery_uuid}`, {
        method: "GET",
       });
      if (!response.ok) {
        throw new Error("Unable to get gallery item data");
      }
      const responseData = await response.json();
      console.log("Received response:", responseData);  
      console.log("дані:", responseData) 
      const galleryItem = responseData.data;
      console.log("галерея:", galleryItem);
      return galleryItem;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
import data from "../../../../../public/data/dataGallery.json";


 export const getAllGallery = async () => {
      return data;
  }

  export const getPictureById = async (id: string) => {
      return data.find((picture) => picture.id === id);
  }

  const NARATYV = process.env.NEXT_PUBLIC_NARATYV_API

  export const getGallery = async () => {
    const game_uuid = "af2ea118-abd1-434d-848c-dd578979c5b9";
    try {
      const response = await fetch(
       `http://localhost:80/api/v1/gallery/${game_uuid}`, {
        method: "GET",
       });
      if (!response.ok) {
        throw new Error("Unable to get gallery data");
      }
      const responseData = await response.json();
      console.log("Received response:", responseData);   
      const gallery = responseData.data;
      console.log("gallery:", gallery);
      return gallery;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };


 export const postGallery = async (
    topic, 
    text,
    photo_jpeg, 
    team_name, 
    game_uuid
   ) => {

    try {
      const formData = new FormData();
      
      formData.append("topic", topic);
      formData.append("text", text);
      formData.append("photo_jpeg", photo_jpeg); 
      formData.append("team_name", team_name);
      formData.append("game_uuid", game_uuid);

      const response = await fetch( `http://localhost:80/api/v1/gallery/${game_uuid}`, {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const responseData = await response.json();
      console.log("Received response:", responseData);   
      const data = responseData.data;
      console.log("data:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
};


 
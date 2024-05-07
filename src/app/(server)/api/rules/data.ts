import data from "../../../../../public/data/dataRules.json";


 export const getAllRules = async () => {
     return data;
 }

 export const getRuleByRole = async (role: string) => {
     return data.find((rule) => rule.role === role);
 }



// export const getAllRules = async () => {
//      const promise = new Promise((res) => {
//          setTimeout(() => res(data), 1500);
//      });
//      return await promise;
//  }

//  export const getRuleByRole = async(role: string) => {
//      const promise = new Promise((res) => {
//          setTimeout(() => res(data.find((rule) => rule.role === role)), 1500);
//      }); 
//      return await promise;
//  } 


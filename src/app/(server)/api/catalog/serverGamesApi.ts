// import { CLOUDINARY_URL, SERVER_API_BASE_URL } from "@/globals/globalsUrl";
// import {
//   IGamesApi,
//   GamesApiFetchProps,
//   GameData,
//   TEAM_FILTER_OPTIONS,
//   SORT_OPTIONS,
// } from "./gamesApi";

// export class ServerGamesApi implements IGamesApi {
//   async fetch(
//     props: GamesApiFetchProps = {}
//   ): Promise<{ games: GameData[]; total: number }> {
//     const filterOption = props.filterOption || TEAM_FILTER_OPTIONS.ALL;
//     const sortOption = props.sortOption || SORT_OPTIONS.POPULARITY;
//     const parinationOffset = props.paginationOffset || 0;
//     const paginationLimit = props.paginationLimit || 10;

//     const url = SERVER_API_BASE_URL + "catalog/games-info/";
//     const params = new URLSearchParams({
//       sortBy: String(sortOption),
//       teamFilter: String(filterOption),
//       offset: String(parinationOffset),
//       limit: String(paginationLimit),
//     });
//     try {
//       const response = await fetch(url + "?" + params.toString());
//       if (response.ok) {
//         const data = await response.json();
//         const total = data.count;
//         const results = data.results;
//         const games: GameData[] = results.map((data: any) => ({
//           id: data.id,
//           img: CLOUDINARY_URL + data.img,
//           icon: Boolean(data.team)
//             ? "../icon/team-game.svg"
//             : "../icon/single-game.svg",
//           iconLike: "../icon/icon-like.svg",
//           nameUa: data.name_ua,
//           nameEn: data.name_en,
//           stat: data.stat,
//           descriptionUa: data.description_ua,
//           descriptionEn: data.description_en,
//           isActive: data.is_active,
//           team: data.is_team,
//           members: data.members,
//           createdAt: new Date(data.create_at),
//         }));
//         return { games, total };
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     return { games: [], total: 0 };
//   }
// }

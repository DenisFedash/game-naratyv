// import { FakeGamesApi } from "./fakeGamesApi";
// import { ServerGamesApi } from "./serverGamesApi";

// export type GameData = {
//   id: string;
//   img: string;
//   icon: string;
//   iconLike: string;
//   nameUa: string;
//   nameEn: string;
//   stat: number;
//   descriptionUa: string;
//   descriptionEn: string;
//   isActive: boolean;
//   team: boolean;
//   members: number;
//   createdAt: Date;
// };

// export enum TEAM_FILTER_OPTIONS {
//   ALL,
//   SINGLE,
//   TEAM,
// }

// export enum SORT_OPTIONS {
//   POPULARITY,
//   NEWNESS,
//   PARTICIPANTS,
// }

// /*
// Інтерфейс, який надає з сторони бекенду список ігор за наданими фільтрами та методом сортування, 
// а також максимальну кількість ігор, яка потрібна для логіки пагінації.
// */
// export interface IGamesApi {
//   fetch(
//     props?: GamesApiFetchProps
//   ): Promise<{ games: GameData[]; total: number }>;
// }

// export type GamesApiFetchProps = {
//   filterOption?: TEAM_FILTER_OPTIONS;
//   sortOption?: SORT_OPTIONS;
//   paginationOffset?: number;
//   paginationLimit?: number;
// };

// export const gamesApi: IGamesApi = new FakeGamesApi();

// export async function gamesApiTest() {
//   const games = await gamesApi.fetch({});
//   console.log(games);
// }

// export function filterAndSort(
//   gamesData: GameData[],
//   filterOption: TEAM_FILTER_OPTIONS,
//   sortOption: SORT_OPTIONS
// ) {
//   return gamesData
//     .filter((gameData) => {
//       if (filterOption === TEAM_FILTER_OPTIONS.ALL) {
//         return true;
//       } else if (filterOption === TEAM_FILTER_OPTIONS.SINGLE) {
//         return !gameData.team;
//       } else {
//         return gameData.team;
//       }
//     })
//     .sort((a, b) => {
//       if (sortOption === SORT_OPTIONS.POPULARITY) {
//         return b.stat - a.stat;
//       } else if (sortOption === SORT_OPTIONS.NEWNESS) {
//         return b.createdAt.getTime() - a.createdAt.getTime();
//       } else if (sortOption === SORT_OPTIONS.PARTICIPANTS) {
//         return b.members - a.members;
//       }
//       return 0;
//     });
// }

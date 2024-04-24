// import dataGames from "../../../public/data/dataGames.json";
// import {
//   IGamesApi,
//   GamesApiFetchProps,
//   GameData,
//   TEAM_FILTER_OPTIONS,
//   SORT_OPTIONS,
// } from "./gamesApi";

// export class FakeGamesApi implements IGamesApi {
//   async fetch(
//     props: GamesApiFetchProps = {}
//   ): Promise<{ games: GameData[]; total: number }> {
    // const filterOption = props.filterOption || TEAM_FILTER_OPTIONS.ALL;
    // const sortOption = props.sortOption || SORT_OPTIONS.POPULARITY;
    // const parinationOffset = props.paginationOffset || 0;
    // const paginationLimit = props.paginationLimit || 10;

    // await new Promise((r) => setTimeout(r, 200)); // fake delay

    // const gamesRaw: GameData[] = dataGames.map((el) => ({
    //   id: el.id,
    //   img: el.img,
    //   icon: el.icon,
    //   iconLike: el.iconLike,
    //   nameUa: el.nameUa,
    //   nameEn: el.nameEn,
    //   stat: Number(el.stat),
    //   descriptionUa: el.descriptionUa,
    //   descriptionEn: el.descriptionEn,
    //   isActive: Boolean(el.isActive),
    //   team: Boolean(el.team),
    //   members: Number(el.members),
    //   createdAt: new Date(el.createdAt),
    // }));
    // .filter((gameData) => {
    //   if (filterOption === TEAM_FILTER_OPTIONS.ALL) {
    //     return true;
    //   } else if (filterOption === TEAM_FILTER_OPTIONS.SINGLE) {
    //     return !gameData.team;
    //   } else {
    //     return gameData.team;
    //   }
    // })
    // .sort((a, b) => {
    //   if (sortOption === SORT_OPTIONS.POPULARITY) {
    //     return b.stat - a.stat;
    //   } else if (sortOption === SORT_OPTIONS.NEWNESS) {
    //     return b.createdAt.getTime() - a.createdAt.getTime();
    //   } else if (sortOption === SORT_OPTIONS.PARTICIPANTS) {
    //     return b.members - a.members;
    //   }
    //   return 0;
    // });
    // const total = gamesRaw.length;
    // const games = gamesRaw.slice(
    //   parinationOffset,
    //   parinationOffset + paginationLimit
    // );
//     const games = gamesRaw;
//     return { games, total };
//   }
// }

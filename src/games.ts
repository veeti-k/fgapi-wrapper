import axios from "axios";
import { getAxiosConfig } from "./config";
import { apiCache } from "./cache/index";
import { apiErrorHandler } from "./errorHandler";
import { Game } from "./interfaces/Game";

export const get = {
  all: async (): Promise<Game[]> => {
    const axiosConfig = getAxiosConfig("GET", "/games");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
      return [];
    }

    return games;
  },

  free: async (): Promise<Game[]> => {
    if (apiCache.games.has.free()) {
      return apiCache.games.get.free();
    }

    const axiosConfig = getAxiosConfig("GET", "/games/free");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
      return apiCache.games.get.free();
    }

    apiCache.games.set.free(games);

    return games;
  },

  upcoming: async (): Promise<Game[]> => {
    if (apiCache.games.has.upcoming()) {
      return apiCache.games.get.upcoming();
    }

    const axiosConfig = getAxiosConfig("GET", "/games/up");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
      return apiCache.games.get.upcoming();
    }

    apiCache.games.set.upcoming(games);

    return games;
  },

  timeUntilNext: async (): Promise<string> => {
    const axiosConfig = getAxiosConfig("GET", "/games/untilnext");

    let time = "";

    try {
      time = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
    }

    return time;
  },

  epic: {
    free: async (): Promise<Game[]> => {
      if (apiCache.games.has.epic.free()) {
        return apiCache.games.get.epic.free();
      }

      const axiosConfig = getAxiosConfig("GET", "/games/epic/free");

      let games: Game[] = [];

      try {
        games = (await axios(axiosConfig)).data;
      } catch (err: any) {
        apiErrorHandler(err);
        return apiCache.games.get.epic.free();
      }

      apiCache.games.set.epic.free(games);

      return games;
    },

    upcoming: async (): Promise<Game[]> => {
      if (apiCache.games.has.epic.free()) {
        return apiCache.games.get.epic.free();
      }

      const axiosConfig = getAxiosConfig("GET", "/games/epic/upcoming");

      let games: Game[] = [];

      try {
        games = (await axios(axiosConfig)).data;
      } catch (err: any) {
        apiErrorHandler(err);
        return apiCache.games.get.epic.free();
      }

      apiCache.games.set.epic.free(games);

      return games;
    },

    timeUntilNext: async (): Promise<string> => {
      const axiosConfig = getAxiosConfig("GET", "/games/epic/untilnext");

      let time = "";

      try {
        time = (await axios(axiosConfig)).data;
      } catch (err: any) {
        apiErrorHandler(err);
      }

      return time;
    },
  },
};

export const save = async (game: Game) => {
  const body: Game = {
    ...game,
  };

  const axiosConfig = getAxiosConfig("POST", "/games", body);

  try {
    await axios(axiosConfig);
  } catch (err: any) {
    apiErrorHandler(err);
  }
};

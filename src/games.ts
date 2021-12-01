import axios from "axios";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { Game } from "./interfaces/Game";
import { ApiSettings } from "./interfaces/ApiSettings";
import { GameCache } from "./cache/index";

export class Games {
  private cache: GameCache;
  get: GetEndpoints;

  constructor(private settings: ApiSettings, cache: GameCache) {
    this.cache = cache;
    this.get = new GetEndpoints(this.settings, this.cache);
  }

  /**
   * Saves the game
   * @param game The {@link Game} to save
   */
  async save(game: Game): Promise<void> {
    const body: Game = {
      ...game,
    };

    const axiosConfig = getAxiosConfig(this.settings, "POST", "/games", body);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

class GetEndpoints {
  epic: EpicGames;
  private cache: GameCache;

  constructor(private settings: ApiSettings, cache: GameCache) {
    this.cache = cache;
    this.epic = new EpicGames(this.settings, this.cache);
  }

  /**
   * Gets all of the games
   * @returns An array of {@link Game}
   */
  async all(): Promise<Game[]> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
      return [];
    }

    return games;
  }

  /**
   * Gets the free games
   * @returns An array of {@link Game} objects
   */
  async free(): Promise<Game[]> {
    if (this.cache.games.hasFree()) {
      return this.cache.games.free;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/free");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.games.free = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.games.free;
    }

    return games;
  }

  /**
   * Gets the upcoming games
   * @returns An array of {@link Game}
   */
  async upcoming(): Promise<Game[]> {
    if (this.cache.games.hasUpcoming()) {
      return this.cache.games.upcoming;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/up");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.games.upcoming = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.games.upcoming;
    }

    return games;
  }

  /**
   * Gets the time until the next game
   * @returns The time as a string
   */
  async timeUntilNext(): Promise<string> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/untilnext");

    let time = "";

    try {
      time = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
    }

    return time;
  }
}

class EpicGames {
  private cache: GameCache;

  constructor(private settings: ApiSettings, cache: GameCache) {
    this.cache = cache;
  }

  /**
   * Gets all the games on the Epic Games Store
   * @returns An array of {@link Game}
   */
  async all(): Promise<Game[]> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
      return [];
    }

    return games;
  }

  /**
   * Gets the free games on the Epic Games Store
   * @returns An array of {@link Game} objects
   */
  async free(): Promise<Game[]> {
    if (this.cache.games.hasFree()) {
      return this.cache.games.free;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/free");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.epic.free = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.games.free;
    }

    return games;
  }

  /**
   * Gets the upcoming games on the Epic Games Store
   * @returns An array of {@link Game}
   */
  async upcoming(): Promise<Game[]> {
    if (this.cache.games.hasUpcoming()) {
      return this.cache.games.upcoming;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/up");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.epic.upcoming = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.games.upcoming;
    }

    return games;
  }

  /**
   * Gets the time until the next game on the Epic Games Store
   * @returns The time as a string
   */
  async timeUntilNext(): Promise<string> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/untilnext");

    let time = "";

    try {
      time = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
    }

    return time;
  }
}

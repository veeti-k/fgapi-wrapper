import axios from "axios";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { Game } from "./interfaces/Game";
import { ApiSettings } from "./interfaces/ApiSettings";
import { EpicGamesCache, GameCache } from "./cache/games";

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
    this.epic = new EpicGames(this.settings, this.cache.epic);
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
    if (this.cache.hasFree()) {
      return this.cache.free;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/free");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.free = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.free;
    }

    return games;
  }

  /**
   * Gets the upcoming games
   * @returns An array of {@link Game}
   */
  async upcoming(): Promise<Game[]> {
    if (this.cache.hasUpcoming()) {
      return this.cache.upcoming;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/up");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.upcoming = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.upcoming;
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
  private cache: EpicGamesCache;

  constructor(private settings: ApiSettings, cache: EpicGamesCache) {
    this.cache = cache;
  }

  /**
   * Gets all the games on the Epic Games Store
   * @returns An array of {@link Game}
   */
  async all(): Promise<Game[]> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", "/epic/games");

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
    if (this.cache.hasFree()) {
      return this.cache.free;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/epic/free");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.free = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.free;
    }

    return games;
  }

  /**
   * Gets the upcoming games on the Epic Games Store
   * @returns An array of {@link Game}
   */
  async upcoming(): Promise<Game[]> {
    if (this.cache.hasUpcoming()) {
      return this.cache.upcoming;
    }

    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/epic/up");

    let games: Game[] = [];

    try {
      games = (await axios(axiosConfig)).data;
      this.cache.upcoming = games;
    } catch (err: any) {
      apiErrorHandler(err);
      return this.cache.upcoming;
    }

    return games;
  }

  /**
   * Get a game by it's ids (Epic Games Store)
   * @returns A {@link Game}
   */
  async gamesByIds(gameIds: string[]): Promise<Game[]> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/games/epic/ids`, { gameIds });

    try {
      const games = (await axios(axiosConfig)).data;
      return games;
    } catch (err: any) {
      apiErrorHandler(err);
      return [];
    }
  }

  /**
   * Gets the time until the next game on the Epic Games Store
   * @returns The time as a string
   */
  async timeUntilNext(): Promise<string> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", "/games/epic/untilnext");

    let time = "";

    try {
      time = (await axios(axiosConfig)).data;
    } catch (err: any) {
      apiErrorHandler(err);
    }

    return time;
  }
}

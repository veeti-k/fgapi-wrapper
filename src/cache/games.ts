import axios from "axios";
import { getAxiosConfig } from "../config";
import { apiErrorHandler } from "../errorHandler";
import { ApiSettings } from "../interfaces/ApiSettings";
import { Game } from "../interfaces/Game";
import { valid } from "../validation/index";

const tenMin = 1000 * 60 * 10;

export class Games {
  private freeGamesUpdatedAt: number;
  private freeGames: Array<Game>;
  private upGamesUpdatedAt: number;
  private upGames: Array<Game>;

  constructor(private settings: ApiSettings) {
    this.freeGamesUpdatedAt = 0;
    this.freeGames = [];
    this.upGamesUpdatedAt = 0;
    this.upGames = [];
  }

  /**
   * Gets the free games from cache
   * @returns An Array of {@link Game} objects
   */
  get free(): Array<Game> {
    return this.freeGames;
  }

  /**
   * Gets the upcoming games from cache
   * @returns An Array of {@link Game} objects
   */
  get upcoming(): Array<Game> {
    return this.upGames;
  }

  set free(games: Game[]) {
    const now = Date.now();

    if (!valid.games(games)) return;

    this.freeGamesUpdatedAt = now;
    this.freeGames = games;
  }

  set upcoming(games: Game[]) {
    const now = Date.now();

    if (!valid.games(games)) return;

    this.upGamesUpdatedAt = now;
    this.upGames = games;
  }

  /**
   * Returns true if free games cache is less than 10 minutes old
   */
  hasFree() {
    const now = Date.now();

    if (!this.freeGamesUpdatedAt) return false;
    if (this.freeGamesUpdatedAt + tenMin > now) return true;

    return false;
  }

  /**
   * Returns true if upcoming games cache is less than 10 minutes old
   */
  hasUpcoming() {
    const now = Date.now();

    if (!this.upGamesUpdatedAt) return false;
    if (this.upGamesUpdatedAt + tenMin > now) return true;

    return false;
  }

  async update() {
    const freeConfig = getAxiosConfig(this.settings, "GET", "/games/free");
    const upConfig = getAxiosConfig(this.settings, "GET", "/games/up");

    try {
      const free = (await axios(freeConfig)).data;
      const upcoming = (await axios(upConfig)).data;

      if (!valid.games(free)) return;
      if (!valid.games(upcoming)) return;

      const now = Date.now();

      this.freeGames = free;
      this.freeGamesUpdatedAt = now;
      this.upGames = upcoming;
      this.upGamesUpdatedAt = now;
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

export class Epic {
  private freeGamesUpdatedAt: number;
  private freeGames: Array<Game>;
  private upGamesUpdatedAt: number;
  private upGames: Array<Game>;

  constructor(private settings: ApiSettings) {
    this.freeGamesUpdatedAt = 0;
    this.freeGames = [];
    this.upGamesUpdatedAt = 0;
    this.upGames = [];
  }

  /**
   * Gets the free games from cache
   * @returns An Array of {@link Game} objects
   */
  get free(): Array<Game> {
    return this.freeGames;
  }

  /**
   * Gets the upcoming games from cache
   * @returns An Array of {@link Game} objects
   */
  get upcoming(): Array<Game> {
    return this.upGames;
  }

  set free(games: Game[]) {
    const now = Date.now();

    if (!valid.games(games)) return;

    this.freeGamesUpdatedAt = now;
    this.freeGames = games;
  }

  set upcoming(games: Game[]) {
    const now = Date.now();

    if (!valid.games(games)) return;

    this.upGamesUpdatedAt = now;
    this.upGames = games;
  }

  /**
   * Returns true if free games cache is less than 10 minutes old
   */
  hasFree() {
    const now = Date.now();

    if (!this.freeGamesUpdatedAt) return false;
    if (this.freeGamesUpdatedAt + tenMin > now) return true;

    return false;
  }

  /**
   * Returns true if upcoming games cache is less than 10 minutes old
   */
  hasUpcoming() {
    const now = Date.now();

    if (!this.upGamesUpdatedAt) return false;
    if (this.upGamesUpdatedAt + tenMin > now) return true;

    return false;
  }

  async update() {
    const freeConfig = getAxiosConfig(this.settings, "GET", "/games/epic/free");
    const upConfig = getAxiosConfig(this.settings, "GET", "/games/epic/up");

    try {
      const free = (await axios(freeConfig)).data;
      const upcoming = (await axios(upConfig)).data;

      if (!valid.games(free)) return;
      if (!valid.games(upcoming)) return;

      const now = Date.now();

      this.freeGames = free;
      this.freeGamesUpdatedAt = now;
      this.upGames = upcoming;
      this.upGamesUpdatedAt = now;
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

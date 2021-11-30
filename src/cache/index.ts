import { ApiSettings } from "../interfaces/ApiSettings";
import { Epic, Games } from "./games";

export class Cache {
  games: GameCache;

  constructor(settings: ApiSettings) {
    this.games = new GameCache(settings);
  }
}

export class GameCache {
  games: Games;
  epic: Epic;

  constructor(private settings: ApiSettings) {
    this.games = new Games(this.settings);
    this.epic = new Epic(this.settings);
  }
}

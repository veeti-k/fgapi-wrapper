import { ApiSettings } from "../interfaces/ApiSettings";
import { GameCache } from "./games";

export class Cache {
  games: GameCache;

  constructor(settings: ApiSettings) {
    this.games = new GameCache(settings);
  }
}

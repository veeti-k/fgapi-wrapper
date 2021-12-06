import { Game } from "./Game";

export interface GameCache {
  games: GamesCache;
  epic: EpicGamesCache;
}

export interface GamesCache {
  free: {
    updatedAt: number;
    games: Game[];
  };
  upcoming: {
    updatedAt: number;
    games: Game[];
  };
}

export interface EpicGamesCache {
  free: {
    updatedAt: number;
    games: Game[];
  };
  upcoming: {
    updatedAt: number;
    games: Game[];
  };
}

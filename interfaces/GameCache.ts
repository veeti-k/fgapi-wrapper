import { Game } from "./Game";

export interface GameCache {
  free: {
    updatedAt: number;
    games: Game[];
  };
  upcoming: {
    updatedAt: number;
    games: Game[];
  };
  epic: {
    free: {
      updatedAt: number;
      games: Game[];
    };
    upcoming: {
      updatedAt: number;
      games: Game[];
    };
  };
}

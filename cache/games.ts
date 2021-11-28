import { api } from "../index";
import { Game } from "../interfaces/Game";
import { GameCache } from "../interfaces/GameCache";

const tenMin = 1000 * 60 * 10;

const gameCache: GameCache = {
  free: {
    updatedAt: 0,
    games: [],
  },
  upcoming: {
    updatedAt: 0,
    games: [],
  },

  epic: {
    free: {
      updatedAt: 0,
      games: [],
    },
    upcoming: {
      updatedAt: 0,
      games: [],
    },
  },
};

export const get = {
  free: (): Game[] => {
    return gameCache.free.games;
  },

  upcoming: (): Game[] => {
    return gameCache.upcoming.games;
  },

  epic: {
    free: (): Game[] => {
      return gameCache.epic.free.games;
    },

    upcoming: (): Game[] => {
      return gameCache.epic.upcoming.games;
    },
  },
};

export const set = {
  free: (games: Game[]) => {
    gameCache.free = {
      updatedAt: new Date().getTime(),
      games,
    };
  },

  upcoming: (games: Game[]) => {
    gameCache.upcoming = {
      updatedAt: new Date().getTime(),
      games,
    };
  },

  epic: {
    free: (games: Game[]) => {
      gameCache.epic.free = {
        updatedAt: new Date().getTime(),
        games,
      };
    },

    upcoming: (games: Game[]) => {
      gameCache.upcoming = {
        updatedAt: new Date().getTime(),
        games,
      };
    },
  },
};

export const has = {
  free: (): boolean => {
    const now = new Date().getTime();

    if (!gameCache.free.updatedAt) return false;
    if (gameCache.free.updatedAt + tenMin > now) return true;

    return false;
  },

  upcoming: (): boolean => {
    const now = new Date().getTime();

    if (!gameCache.upcoming.updatedAt) return false;
    if (gameCache.upcoming.updatedAt + tenMin > now) return true;

    return false;
  },

  epic: {
    free: (): boolean => {
      const now = new Date().getTime();

      if (!gameCache.epic.free.updatedAt) return false;
      if (gameCache.epic.free.updatedAt + tenMin > now) return true;

      return false;
    },

    upcoming: (): boolean => {
      const now = new Date().getTime();

      if (!gameCache.epic.upcoming.updatedAt) return false;
      if (gameCache.epic.upcoming.updatedAt + tenMin > now) return true;

      return false;
    },
  },
};

export const update = async () => {
  const free = await api.routes.games.get.free();
  const upcoming = await api.routes.games.get.upcoming();
  const freeEpic = await api.routes.games.get.epic.upcoming();
  const upcomingEpic = await api.routes.games.get.epic.upcoming();

  const now = new Date().getTime();

  gameCache.free = {
    updatedAt: now,
    games: free,
  };

  gameCache.upcoming = {
    updatedAt: now,
    games: upcoming,
  };

  gameCache.epic.free = {
    updatedAt: now,
    games: freeEpic,
  };

  gameCache.epic.upcoming = {
    updatedAt: now,
    games: upcomingEpic,
  };
};

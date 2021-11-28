import * as games from "./games";
import * as guilds from "./guilds";
import * as logs from "./logs";
import { setApiBaseUrl, setApiToken } from "./config";

export const api = {
  routes: {
    games,
    guilds,
    logs,
  },
  setToken: setApiToken,
  setBaseUrl: setApiBaseUrl,
};

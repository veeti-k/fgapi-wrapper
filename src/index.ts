import * as games from "./games";
import * as guilds from "./guilds";
import * as logs from "./logs";
import * as notifications from "./notifications";
import { setApiBaseUrl, setApiToken } from "./config";

export const api = {
  routes: {
    games,
    guilds,
    logs,
    notifications,
  },
  setToken: setApiToken,
  setBaseUrl: setApiBaseUrl,
};

import { Cache } from "./cache/index";
import { Games } from "./games";
import { GuildEndpoint } from "./guilds";
import { ApiSettings } from "./interfaces/ApiSettings";
import { Logs } from "./logs";

export class TheApi {
  private cache: Cache;
  guilds: GuildEndpoint;
  games: Games;
  logs: Logs;

  constructor(private settings: ApiSettings) {
    if (!settings.token) throw new Error("Api configuration error. Invalid token.");
    if (!settings.baseUrl) throw new Error("Api configuration error. Invalid baseUrl.");

    this.settings.token = settings.token;
    this.settings.baseUrl = settings.baseUrl;

    this.cache = new Cache(this.settings);
    this.guilds = new GuildEndpoint(this.settings);
    this.games = new Games(this.settings, this.cache.games);
    this.logs = new Logs(this.settings);
  }
}

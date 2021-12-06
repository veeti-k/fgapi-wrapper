import { Cache } from "./cache/index";
import { Games } from "./games";
import { GuildEndpoint } from "./guilds";
import { ApiSettings } from "./interfaces/ApiSettings";
import { Logs } from "./logs";
import { Channels } from "./channels";

export class TheApi {
  cache: Cache;
  guilds: GuildEndpoint;
  games: Games;
  logs: Logs;
  channels: Channels;

  constructor(private settings: ApiSettings) {
    if (!settings.token) throw new Error("Api configuration error. Invalid token.");
    if (!settings.baseUrl) throw new Error("Api configuration error. Invalid baseUrl.");

    this.cache = new Cache(this.settings);
    this.guilds = new GuildEndpoint(this.settings);
    this.games = new Games(this.settings, this.cache.games);
    this.logs = new Logs(this.settings);
    this.channels = new Channels(this.settings);
  }
}

import axios from "axios";
import { getAxiosConfig } from "./config";
import { ApiSettings } from "./interfaces/ApiSettings";
import { Guild, SetChGuild } from "./interfaces/Guild";

export class GuildEndpoint {
  set: SetEndpoints;
  get: GetEndpoints;
  remove: RemoveEndPoints;

  constructor(private settings: ApiSettings) {
    this.set = new SetEndpoints(this.settings);
    this.get = new GetEndpoints(this.settings);
    this.remove = new RemoveEndPoints(this.settings);
  }
}

class SetEndpoints {
  constructor(private settings: ApiSettings) {}

  async channel(guildId: string, channelId: string) {
    const data = {
      channelId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/channel`, data);

    await axios(axiosConfig);
  }

  async role(guildId: string, roleId: string) {
    const data = {
      roleId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/role`, data);

    await axios(axiosConfig);
  }

  async emoji(guildId: string, emoji: string) {
    const data = {
      emoji,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/emoji`, data);

    await axios(axiosConfig);
  }

  async language(guildId: string, language: string) {
    const data = {
      language,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/emoji`, data);

    await axios(axiosConfig);
  }
}

/* 
REMOVE
*/

class RemoveEndPoints {
  constructor(private settings: ApiSettings) {}

  async channel(guildId: string) {
    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/channel`);

    await axios(axiosConfig);
  }

  async role(guildId: string) {
    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/role`);

    await axios(axiosConfig);
  }

  async emoji(guildId: string) {
    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/emoji`);

    await axios(axiosConfig);
  }
}

/*
GET 
*/

class GetEndpoints {
  count: GuildCountEndPoints;

  constructor(private settings: ApiSettings) {
    this.count = new GuildCountEndPoints(this.settings);
  }

  /**
   * @description Gets all the bot's guilds
   * @returns An array of {@link Guild}
   */
  async all(): Promise<Guild[]> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  }

  /**
   * @description Gets a guild with it's id
   * @param guildId The id of the guild to get
   * @returns A {@link Guild} or null if guild not found
   */
  async one(guildId: string): Promise<Guild> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/${guildId}`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  }

  /**
   * @description Gets all of the bot's guilds that have set a channel
   * @returns An array of {@link SetChGuild}
   */
  async setCh(): Promise<SetChGuild[]> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/setch`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  }
}

class GuildCountEndPoints {
  constructor(private settings: ApiSettings) {}

  /**
   * @description Gets the count of the bot's guilds
   * @returns The guild count as number
   */
  async guildCount(): Promise<number> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/count`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  }

  /**
   * @description Gets the count of the guilds that have not set a channel
   * @returns The count as a number
   */
  async noChCount(): Promise<number> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/noch/count`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  }

  /**
   * @description Gets the count of the guilds that have not set a role
   * @returns The count as a number
   */
  async noRoleCount(): Promise<number> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/norole/count`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  }

  /**
   * @description Gets the count of guilds that have not set an emoji
   * @returns The count as a number
   */
  async noEmojiCount(): Promise<number> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/noemoji/coint`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  }
}

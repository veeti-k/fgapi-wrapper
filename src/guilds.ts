import axios from "axios";
import { Webhook } from "discord.js";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { ApiSettings } from "./interfaces/ApiSettings";
import { DBGuild, SetChDBGuild, SetWhDBGuild } from "./interfaces/Guilds";

export class GuildEndpoint {
  set: SetEndpoints;
  get: GetEndpoints;
  remove: RemoveEndPoints;

  constructor(private settings: ApiSettings) {
    this.set = new SetEndpoints(this.settings);
    this.get = new GetEndpoints(this.settings);
    this.remove = new RemoveEndPoints(this.settings);
  }

  /**
   * Create a guild
   * @returns The created {@link DBGuild}
   */
  async create(guild: DBGuild): Promise<DBGuild | null> {
    try {
      const res = await axios(getAxiosConfig(this.settings, "POST", "/guilds", guild));

      return res.data;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }
}

class SetEndpoints {
  constructor(private settings: ApiSettings) {}

  /**
   * Set a guild's channel
   * @returns The updated {@link DBGuild}
   */
  async channel(guildId: string, channelId: string, webhook: Webhook): Promise<DBGuild | null> {
    const data = {
      channelId,
      webhook: {
        id: webhook.id,
        token: webhook.token,
        userId: webhook.owner!.id, // will always be the bot
        channelId: webhook.channelId,
      },
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/channel`, data);

    try {
      const res = await axios(axiosConfig);
      return res.data as unknown as DBGuild;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * Set a guild's role
   * @returns The updated {@link DBGuild}
   */
  async role(guildId: string, roleId: string): Promise<DBGuild | null> {
    const data = {
      roleId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/role`, data);

    try {
      const res = await axios(axiosConfig);
      return res.data as unknown as DBGuild;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * Set a guild's language
   * @returns The updated {@link DBGuild}
   */
  async language(guildId: string, language: string) {
    const data = {
      language,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/language`, data);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  /**
   * Set a guild's webhook
   * @returns The updated {@link DBGuild}
   */
  async webhook(guildId: string, webhook: Webhook) {
    const data = {
      webhook,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/webhook`, data);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

/* 
REMOVE
*/

class RemoveEndPoints {
  constructor(private settings: ApiSettings) {}

  /**
   * Remove a guild's channel
   * @returns The old {@link DBGuild} before the removing
   */
  async channel(guildId: string): Promise<DBGuild | null> {
    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/channel`);

    try {
      const res = await axios(axiosConfig);
      return res.data;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * Remove a guild's role
   */
  async role(guildId: string) {
    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/role`);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  /**
   * Remove a guild's webhook
   */
  async webhook(guildId: string) {
    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/webhook`);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  /**
   * Remove a guild
   */
  async guild(guildId: string) {
    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}`);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
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
  async all(): Promise<DBGuild[] | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds`);

    try {
      const guilds = (await axios(axiosConfig)).data;
      return guilds;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * @description Gets a guild with it's id
   * @param guildId The id of the guild to get
   * @returns A {@link Guild}
   */
  async one(guildId: string): Promise<DBGuild | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/${guildId}`);

    try {
      const guild = (await axios(axiosConfig)).data;
      return guild;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * @description Gets all of the bot's guilds that have a set webhook
   * @returns An array of {@link SetWhDBGuild}
   */
  async setWebhook(): Promise<SetWhDBGuild[] | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/webhook`);

    try {
      const guilds = (await axios(axiosConfig)).data;
      return guilds;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * @description Gets all of the bot's guilds that have set a channel
   * @returns An array of {@link SetChGuild}
   */
  async setCh(): Promise<SetChDBGuild[] | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/setch`);

    try {
      const guilds = (await axios(axiosConfig)).data;
      return guilds;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }
}

class GuildCountEndPoints {
  constructor(private settings: ApiSettings) {}

  /**
   * @description Gets the count of the bot's guilds
   * @returns The guild count as number
   */
  async guildCount(): Promise<number | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/count`);

    try {
      const count = (await axios(axiosConfig)).data;
      return count;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * @description Gets the count of the guilds that have not set a channel
   * @returns The count as a number
   */
  async noChCount(): Promise<number | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/noch/count`);

    try {
      const count = (await axios(axiosConfig)).data;
      return count;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * @description Gets the count of the guilds that have not set a role
   * @returns The count as a number
   */
  async noRoleCount(): Promise<number | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/norole/count`);

    try {
      const count = (await axios(axiosConfig)).data;
      return count;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }

  /**
   * @description Gets the count of guilds that have not set an emoji
   * @returns The count as a number
   */
  async noEmojiCount(): Promise<number | null> {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/guilds/noemoji/coint`);

    try {
      const count = (await axios(axiosConfig)).data;
      return count;
    } catch (err: any) {
      apiErrorHandler(err);
      return null;
    }
  }
}

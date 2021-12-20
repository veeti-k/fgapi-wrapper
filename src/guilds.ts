import axios from "axios";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { ApiSettings } from "./interfaces/ApiSettings";
import { DBGuild, SetChDBGuild } from "./interfaces/Guilds";
import { Webhook } from "./interfaces/Webhook";

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

  /**
   * @returns The updated {@link DBGuild}
   */
  async channel(guildId: string, channelId: string, webhook: Webhook): Promise<DBGuild | null> {
    const data = {
      channelId,
      guildId,
      webhook,
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
   * @returns The updated {@link DBGuild}
   */
  async role(guildId: string, roleId: string): Promise<DBGuild | null> {
    const data = {
      roleId,
      guildId,
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

  async emoji(guildId: string, emoji: string) {
    const data = {
      emoji,
      guildId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/emoji`, data);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  async language(guildId: string, language: string) {
    const data = {
      language,
      guildId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "PATCH", `/guilds/${guildId}/language`, data);

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

  async channel(guildId: string) {
    const data = {
      guildId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/channel`, data);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  async role(guildId: string) {
    const data = {
      guildId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/role`, data);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  async emoji(guildId: string) {
    const data = {
      guildId,
    };

    const axiosConfig = getAxiosConfig(this.settings, "DELETE", `/guilds/${guildId}/emoji`, data);

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

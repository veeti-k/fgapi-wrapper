import axios from "axios";
import { getAxiosConfig } from "./config";
import { Guild, SetChGuild } from "./interfaces/Guild";

/*
SET
*/

export const set = {
  channel: async (guildId: string, channelId: string) => {
    const data = {
      channelId,
    };

    const axiosConfig = getAxiosConfig("POST", `/guilds/${guildId}/channel`, data);

    await axios(axiosConfig);
  },

  role: async (guildId: string, roleId: string) => {
    const data = {
      roleId,
    };

    const axiosConfig = getAxiosConfig("POST", `/guilds/${guildId}/role`, data);

    await axios(axiosConfig);
  },

  emoji: async (guildId: string, emoji: string) => {
    const data = {
      emoji,
    };

    const axiosConfig = getAxiosConfig("POST", `/guilds/${guildId}/emoji`, data);

    await axios(axiosConfig);
  },

  language: async (guildId: string, language: string) => {
    const data = {
      language,
    };

    const axiosConfig = getAxiosConfig("POST", `/guilds/${guildId}/language`, data);

    await axios(axiosConfig);
  },
};

/* 
REMOVE
*/

export const remove = {
  channel: async (guildId: string) => {
    const axiosConfig = getAxiosConfig("DELETE", `/guilds/${guildId}/channel`);

    await axios(axiosConfig);
  },

  role: async (guildId: string) => {
    const axiosConfig = getAxiosConfig("DELETE", `/guilds/${guildId}/role`);

    await axios(axiosConfig);
  },
  emoji: async (guildId: string) => {
    const axiosConfig = getAxiosConfig("DELETE", `/guilds/${guildId}/emoji`);

    await axios(axiosConfig);
  },
};

/*
GET
*/

export const get = {
  /**
   * @description Get all the bot's guilds
   * @returns An array of guilds
   */
  guilds: async (): Promise<Guild[]> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  },

  /**
   * @description Get a guild with guildId
   * @param guildId The id of the guild to get
   * @returns Guild or null if guild not found
   */
  aGuild: async (guildId: string): Promise<Guild | null> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/${guildId}`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  },

  /**
   * @description Get all the bot's guilds that have set a channel
   * @returns An array of guilds
   */
  setCh: async (): Promise<SetChGuild[]> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  },

  /**
   * @description Get the count of bot's guilds
   * @returns The count as number
   */
  guildCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },

  /**
   * @description Get the count of guilds that have not set a channel
   * @returns The count as a number
   */
  noChCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/noch/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },

  /**
   * @description Get the count of guilds that have not set a role
   * @returns The count as a number
   */
  noRoleCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/norole/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },

  /**
   * @description Get the count of guilds that have not set an emoji
   * @returns The count as a number
   */
  noEmojiCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/noemoji/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },
};

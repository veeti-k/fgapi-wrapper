import axios from "axios";
import { getAxiosConfig } from "./config";
import { Guild } from "./interfaces/Guild";

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
  aGuild: async (guildId: string): Promise<Guild> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds${guildId}`);

    const guild = (await axios(axiosConfig)).data;

    return guild;
  },

  guildCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },

  noChCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/noch/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },
  noRoleCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/norole/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },

  noEmojiCount: async (): Promise<number> => {
    const axiosConfig = getAxiosConfig("GET", `/guilds/noemoji/count`);

    const count = (await axios(axiosConfig)).data;

    return count;
  },
};

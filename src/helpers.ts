import { Guild } from "discord.js";
import { APILogGuild } from "./interfaces/Guilds";

export const APIGuildFromGuild = (guild: Guild): APILogGuild => {
  return {
    name: guild.name,
    id: guild.id,
    memberCount: guild.memberCount,
    ownerId: guild.ownerId,
  };
};

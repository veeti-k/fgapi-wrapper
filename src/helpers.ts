import { Guild } from "discord.js";
import { APIGuild } from "./interfaces/ApiGuild";

export const APIGuildFromGuild = (guild: Guild): APIGuild => {
  return {
    name: guild.name,
    id: guild.id,
    memberCount: guild.memberCount,
    ownerId: guild.ownerId,
  };
};

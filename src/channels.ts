import axios from "axios";
import { GuildTextBasedChannel } from "discord.js";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { ApiSettings } from "./interfaces/ApiSettings";

export class Channels {
  constructor(private settings: ApiSettings) {}

  async update(newChannel: GuildTextBasedChannel, validPerms: boolean, missingPerms: string[]) {
    const data = {
      channelId: newChannel.id,
      ownerId: newChannel.guild.ownerId,
      missingPerms,
      validPerms,
      guildId: newChannel.guild.id,
    };

    const axiosConfig = getAxiosConfig(this.settings, "POST", "/channels/update", data);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

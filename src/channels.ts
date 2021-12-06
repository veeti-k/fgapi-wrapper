import axios from "axios";
import { GuildTextBasedChannel } from "discord.js";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { ApiSettings } from "./interfaces/ApiSettings";
import { ChannelOverwrites } from "./interfaces/ChannelOverwrites";

export class Channels {
  constructor(private settings: ApiSettings) {}

  async update(
    oldChannel: GuildTextBasedChannel,
    newChannel: GuildTextBasedChannel,
    newChannelOverwrites: ChannelOverwrites,
    ownerId: string
  ) {
    const axiosConfig = getAxiosConfig(this.settings, "POST", "/channels/update");

    const data = {
      old: oldChannel,
      new: newChannel,
      newOverwrites: newChannelOverwrites,
      ownerId,
    };

    try {
      await axios.post(axiosConfig.url, data, axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

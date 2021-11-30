import axios from "axios";
import { CommandInteraction, Guild } from "discord.js";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { ApiSettings } from "./interfaces/ApiSettings";
import { Command } from "./interfaces/Command";
import { Event, EventTypes } from "./interfaces/Event";
import { valid } from "./validation/index";

export class Logs {
  add: AddEndpoint;

  constructor(private settings: ApiSettings) {
    this.add = new AddEndpoint(this.settings);
  }
}

export class AddEndpoint {
  constructor(private settings: ApiSettings) {}

  async command(interaction: CommandInteraction) {
    if (!interaction.guild) return;
    const guildOwner = await interaction.guild.fetchOwner();

    const command: Command = {
      name: interaction.commandName,
      sender: {
        tag: interaction.user.tag,
        id: interaction.user.id,
      },
      guild: {
        name: interaction.guild.name,
        id: interaction.guild.id,
        memberCount: interaction.guild.memberCount,
        owner: {
          tag: guildOwner.user.tag,
          id: guildOwner.user.id,
        },
      },
    };

    if (!valid.log.command(command)) return;

    const axiosConfig = getAxiosConfig(this.settings, "POST", "/logs/cmd", command);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  async event(guild: Guild, eventType: EventTypes) {
    const guildOwner = await guild.fetchOwner();

    const event: Event = {
      type: eventType,
      guild: {
        name: guild!.name,
        id: guild!.id,
        memberCount: guild!.memberCount,
        owner: {
          tag: guildOwner.user.tag,
          id: guildOwner.user.id,
        },
      },
    };

    if (!valid.log.event(event)) return;

    const axiosConfig = getAxiosConfig(this.settings, "POST", "/logs/event", event);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

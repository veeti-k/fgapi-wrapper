import axios from "axios";
import { CommandInteraction, Guild } from "discord.js";
import { getAxiosConfig } from "./config";

export const sendCmd = async (interaction: CommandInteraction): Promise<void> => {
  const guildOwner = await interaction.guild!.fetchOwner();

  const commandLog = {
    commandName: interaction.commandName,
    sender: {
      tag: interaction.user.tag,
      id: interaction.user.id,
    },
    guild: {
      name: interaction.guild!.name,
      id: interaction.guild!.id,
      memberCount: interaction.guild!.memberCount,
      owner: {
        tag: guildOwner.user.tag,
        id: guildOwner.user.id,
      },
    },
  };

  const axiosConfig = getAxiosConfig("POST", "/logs/cmd", commandLog);

  axios(axiosConfig).catch((err) => console.log(err));
};

export const sendEvent = async (guild: Guild, eventName: string): Promise<void> => {
  const guildOwner = await guild.fetchOwner();

  const eventLog = {
    eventName,
    guild: {
      name: guild!.name,
      id: guild!.id,
      memberCount: guild!.memberCount,
      owner: {
        tag: guildOwner.user,
        id: guildOwner.user.id,
      },
    },
  };

  const axiosConfig = getAxiosConfig("POST", "/logs/event", eventLog);

  axios(axiosConfig).catch((err) => console.log(err));
};

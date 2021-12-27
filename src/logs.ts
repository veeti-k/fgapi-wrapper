import axios from "axios";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { ApiSettings } from "./interfaces/ApiSettings";
import { Command } from "./interfaces/Command";
import { SendsLog } from "./interfaces/SendsLog";
import { User } from "./interfaces/User";
import { valid } from "./validation/index";

export class Logs {
  add: AddEndpoint;

  constructor(private settings: ApiSettings) {
    this.add = new AddEndpoint(this.settings);
  }
}

export class AddEndpoint {
  constructor(private settings: ApiSettings) {}

  async command(commandName: string, user: User, guildId: string) {
    const command: Command = {
      name: commandName,
      user,
      guildId,
    };

    if (!valid.log.command(command)) return;

    const axiosConfig = getAxiosConfig(this.settings, "POST", "/logs/cmd", command);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }

  async sends(log: SendsLog) {
    const axiosConfig = getAxiosConfig(this.settings, "POST", "/logs/sends", log);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

import axios from "axios";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { ApiSettings } from "./interfaces/ApiSettings";
import { Command } from "./interfaces/Command";
import { SendsLog } from "./interfaces/SendsLog";
import { User } from "./interfaces/User";
import { valid } from "./validation/index";

export class Logs {
  add: AddEndpoints;
  get: GetEndpoints;

  constructor(private settings: ApiSettings) {
    this.add = new AddEndpoints(this.settings);
    this.get = new GetEndpoints(this.settings);
  }
}

export class AddEndpoints {
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

export class GetEndpoints {
  constructor(private settings: ApiSettings) {}

  /*
   * Gets the logs for a specific logId, these are the guilds that the game has sent to already.
   */
  async sends(logId: string) {
    const axiosConfig = getAxiosConfig(this.settings, "GET", `/logs/sends/${logId}`);

    try {
      const response = await axios(axiosConfig);
      return response.data;
    } catch (err: any) {
      apiErrorHandler(err);
    }
  }
}

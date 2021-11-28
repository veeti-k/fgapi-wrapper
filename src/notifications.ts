import axios from "axios";
import { getAxiosConfig } from "./config";
import { apiErrorHandler } from "./errorHandler";
import { Command } from "./interfaces/Command";
import { Event } from "./interfaces/Event";
import { valid } from "./validation/index";

export const send = {
  command: async (command: Command) => {
    if (!valid.notification.command(command)) return;

    const body = {
      command,
    };

    const axiosConfig = getAxiosConfig("POST", "/fg/cmd", body);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  },

  event: async (event: Event) => {
    if (!valid.notification.event(event)) return;

    const body = {
      event,
    };

    const axiosConfig = getAxiosConfig("POST", "/fg/event", body);

    try {
      await axios(axiosConfig);
    } catch (err: any) {
      apiErrorHandler(err);
    }
  },
};

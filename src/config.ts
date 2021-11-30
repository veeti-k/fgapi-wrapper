import { Method } from "axios";
import { ApiSettings } from "./interfaces/ApiSettings";

export const getAxiosConfig = (settings: ApiSettings, method: Method, url: string, body?: any) => {
  return {
    method,
    url: `${settings.baseUrl}${url}`,
    headers: {
      Authorization: `token ${settings.token}`,
      "Content-Type": "application/json",
    },
    data: body,
  };
};

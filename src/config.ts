import { Method } from "axios";
import { apiBaseUrl } from "../config/vars";

let apiToken = "";

export const getAxiosConfig = (method: Method, url: string, body?: any) => {
  return {
    method,
    url: `${apiBaseUrl}${url}`,
    headers: {
      Authorization: `token ${apiToken}`,
      "Content-Type": "application/json",
    },
    data: body,
  };
};

export const setApiToken = (token: string) => {
  apiToken = token;
};

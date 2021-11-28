import { Method } from "axios";

let apiToken = "";
let apiBaseUrl = "";

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

export const setApiBaseUrl = (url: string) => {
  apiBaseUrl = url;
};

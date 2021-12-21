import { Webhook } from "./Webhook";

export interface APILogGuild {
  name: string;
  id: string;
  memberCount: number;
  ownerId: string;
}

export interface DBGuild {
  botId: string;
  guildId: string;
  roleId: string | null;
  channelId: string | null;
  emoji: string | null;
  language: string;
  webhook: Webhook | null;
}

export interface SetChDBGuild extends DBGuild {
  channelId: string;
}

export interface SetWhDBGuild extends DBGuild {
  webhook: Webhook;
  channelId: string;
}

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
}

export interface SetChDBGuild extends DBGuild {
  channelId: string;
}

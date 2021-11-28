export interface Guild {
  botId: string;
  guildId: string;
  roleId: string | null;
  channelId: string | null;
  emoji: string | null;
  language: string;
}

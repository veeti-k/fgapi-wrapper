export interface SendsLog {
  guildId: string;
  game: string;
  result: {
    sent: boolean;
    reason: string | null;
  };
}

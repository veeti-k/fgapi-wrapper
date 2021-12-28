export interface SendsLog {
  guildId: string;
  logId: string;
  result: {
    sent: boolean;
    reason: string | null;
  };
}

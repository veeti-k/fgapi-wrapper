import { User } from "./User";

export interface Command {
  name: string;
  user: User;
  guildId: string;
}

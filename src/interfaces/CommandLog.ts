export interface CommandLog {
  name: string;
  respondedIn: number;
  sender: {
    id: string;
    name: string;
  };
  guild: {
    id: string;
  };
}

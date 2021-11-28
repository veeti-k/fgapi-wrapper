export interface Command {
  name: string;
  sender: {
    tag: string;
    id: string;
  };
  guild: {
    name: string;
    id: string;
    memberCount: string;
    owner: {
      tag: string;
      id: string;
    };
  };
}

export interface Event {
  name: string;
  guild: {
    name: string;
    id: string;
    memberCount: number;
    owner: {
      tag: string;
      id: string;
    };
  };
}

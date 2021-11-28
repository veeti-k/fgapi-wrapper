export interface Event {
  name: string;
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

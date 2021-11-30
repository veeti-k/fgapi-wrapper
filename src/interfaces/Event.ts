export interface Event {
  type: EventTypes;
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

export enum EventTypes {
  ROLE_SET = "ROLE_SET",
  ROLE_REMOVED = "ROLE_REMOVED",
  CHANNEL_SET = "CHANNEL_SET",
  CHANNEL_REMOVED = "CHANNEL_REMOVED",
  LANGUAGE_SET = "LANGUAGE_SET",
  EMOJI_SET = "EMOJI_SET",
  EMOJI_REMOVED = "EMOJI_REMOVED",
  JOINED = "JOINED",
  LEFT = "LEFT",
}

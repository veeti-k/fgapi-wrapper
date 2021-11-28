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
  roleSet = "ROLE_SET",
  roleRemoved = "ROLE_REMOVED",
  channelSet = "CHANNEL_SET",
  channelRemoved = "CHANNEL_REMOVED",
  languageSet = "LANGUAGE_SET",
  emojiSet = "EMOJI_SET",
  emojiRemoved = "EMOJI_REMOVED",
  joined = "JOINED",
  left = "LEFT",
}

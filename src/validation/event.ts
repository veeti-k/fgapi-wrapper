import { Event, EventTypes } from "../interfaces/Event";

export default (event: Event) => {
  const propError = validateProps(event);
  const propTypeError = validatePropTypes(event);

  if (propError) {
    console.log(new Error("Event prop error" + propError));
    return false;
  }
  if (propTypeError) {
    console.log(new TypeError("Event proptype error" + propError));
    return false;
  }

  return true;
};

const validateProps = (event: Event) => {
  if (!event.type) return "'type' was not provided";

  if (!Object.values(EventTypes).includes(event.type)) return "'type' is not a valid event type";

  if (!event.guild) return "'guild' was not provided";
  if (!event.guild.id) return "'guild.id' was not provided";
  if (!event.guild.memberCount) return "'guild.memberCount' was not provided";
  if (!event.guild.name) return "'guild.name' was not provided";
  if (!event.guild.owner) return "'guild.owner' was not provided";
  if (!event.guild.owner.id) return "'guild.owner.id' was not provided";
  if (!event.guild.owner.tag) return "'guild.owner.id' was not provided";
};

const validatePropTypes = (event: Event) => {
  if (typeof event.type !== "string") return "'type' must be the type of string";

  if (typeof event.guild.id !== "string") return "'guild.id' must be the type of string";
  if (typeof event.guild.name !== "string") return "'guild.name' must be the type of string";
  if (typeof event.guild.memberCount !== "number")
    return "'guild.memberCount' must be the type of number";
  if (typeof event.guild.owner.id !== "string")
    return "'guild.owner.id' must be the type of string";
  if (typeof event.guild.owner.tag !== "string")
    return "'guild.owner.tag' must be the type of string";
};

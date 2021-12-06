import { Command } from "../interfaces/Command";

export default (command: Command) => {
  const propError = validateProps(command);
  const propTypeError = validatePropTypes(command);

  if (propError) {
    console.log(new Error("Command prop error" + propError));
    return false;
  }
  if (propTypeError) {
    console.log(new TypeError("Command prop type error" + propError));
    return false;
  }

  return true;
};

const validateProps = (command: Command) => {
  if (!command.name) return "'name' was not provided";
  if (!command.botId) return "'botId' was not provided";

  if (!command.guild) return "'guild' was not provided";
  if (!command.guild.id) return "'guild.id' was not provided";
  if (!command.guild.memberCount) return "'guild.memberCount' was not provided";
  if (!command.guild.name) return "'guild.name' was not provided";
  if (!command.guild.owner) return "'guild.owner' was not provided";
  if (!command.guild.owner.id) return "'guild.owner.id' was not provided";
  if (!command.guild.owner.tag) return "'guild.owner.id' was not provided";
};

const validatePropTypes = (command: Command) => {
  if (typeof command.name !== "string") return "'name' must be the type of string";
  if (typeof command.botId !== "string") return "'botId' must be the type of string";

  if (typeof command.guild.id !== "string") return "'guild.id' must be the type of string";
  if (typeof command.guild.name !== "string") return "'guild.name' must be the type of string";
  if (typeof command.guild.memberCount !== "number")
    return "'guild.memberCount' must be the type of number";
  if (typeof command.guild.owner.id !== "string")
    return "'guild.owner.id' must be the type of string";
  if (typeof command.guild.owner.tag !== "string")
    return "'guild.owner.tag' must be the type of string";
};

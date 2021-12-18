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
  if (!command.guildId) return "'guildId' was not provided";
  if (!command.user) return "'user' was not provided";

  if (!command.user.id) return "'user.id' was not provided";
  if (!command.user.locale) return "'user.locale' was not provided";
  if (!command.user.tag) return "'user.tag' was not provided";
};

const validatePropTypes = (command: Command) => {
  if (typeof command.name !== "string") return "'name' must be the type of string";
  if (typeof command.guildId !== "string") return "'botId' must be the type of string";

  if (typeof command.user.id !== "string") return "'user.id' must be the type of string";
  if (typeof command.user.locale !== "string") return "'user.locale' must be the type of string";
  if (typeof command.user.tag !== "string") return "'user.tag' must be the type of string";
};

import { Game } from "../interfaces/Game";

export default (games: Game[]): boolean => {
  for (const game of games) {
    const propError = validateProps(game);
    const propTypeError = validatePropTypes(game);

    if (propError) console.log(new Error(`Game validation error: ${propError}`));

    if (propTypeError) console.log(new TypeError(`Game type validation error: ${propTypeError}`));
  }

  return true;
};

const validateProps = (game: Game): string | undefined => {
  if (!game.name) return "'name' was not provided";
  if (!game.imgUrl) return "'imgUrl' was not provided";
  if (!game.start) return "'start' was not provided";
  if (!game.end) return "'end' was not provided";
  if (!Object.keys(game).includes("sent")) return "'sent' was not provided";
  if (!Object.keys(game).includes("confirmed")) return "'confirmed' was not provided";

  if (!Object.keys(game).includes("store")) return "'store' was not provided";
  if (!game.store.name) return "'store.name' was not provided";
  if (!game.store.url) return "'store.url' was not provided";

  if (!game.price) return "'price' was not provided";
  if (!game.link) return "'link' was not provided";
};

const validatePropTypes = (game: Game): string | undefined => {
  if (typeof game.name !== "string") return "'name' must be the type of string";
  if (typeof game.imgUrl !== "string") return "'imgUrl' must be the type of string";
  if (typeof game.start !== "number") return "'start' must be the type of number";
  if (typeof game.end !== "number") return "'end' must be the type of number";
  if (typeof game.sent !== "boolean") return "'sent' must be the type of boolean";
  if (typeof game.confirmed !== "boolean") return "'confirmed' must be the type of boolean";

  if (typeof game.store.name !== "string") return "'store.name' must be the type of string";
  if (typeof game.store.url !== "string") return "'store.url' must be the type of string";

  if (typeof game.price !== "string") return "'price' must be the type of string";
  if (typeof game.link !== "string") return "'link' must be the type of string";
};

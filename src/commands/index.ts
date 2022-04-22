import path from "path";
import getPath from "../util/getPath.js";
import readModules from "../util/readModules.js";
import type { CommandData } from "../typings/Command.js";

const { __dirname } = getPath(import.meta.url);

const commonCommandNameEnum = {
  "connectchannel": 0,
};
const commonCommands: { [K in keyof typeof commonCommandNameEnum]: CommandData<K> } = readModules({
  dirname: path.join(__dirname, "common")
}) as unknown as any;

const modCommandNameEnum = {
  "ban": 0,
  "unban": 1,
};
const modCommands: { [K in keyof typeof modCommandNameEnum]: CommandData<K> } = readModules({
  dirname: path.join(__dirname, "common")
}) as unknown as any;

export {
  commonCommands,
  modCommands
};
export const commandJSON = {
  commonCommands: Object.values(commonCommands).map(commandData => commandData.slashCommand.toJSON()),
  modCommands: Object.values(modCommands).map(commandData => commandData.slashCommand.toJSON()),
};


import path from "path";
import getPath from "../util/getPath.js";
import readModules from "../util/readModules.js";
const { __dirname } = getPath(import.meta.url);
const commonCommandNameEnum = {
    "connectchannel": 0,
};
const commonCommands = Object.fromEntries(Object.entries(await readModules({
    dirname: path.join(__dirname, "common")
})).map(([key, mod]) => [key, mod.default]));
const modCommandNameEnum = {
    "ban": 0,
    "unban": 1,
};
const modCommands = Object.fromEntries(Object.entries(await readModules({
    dirname: path.join(__dirname, "common")
})).map(([key, mod]) => [key, mod.default]));
export { commonCommands, modCommands };
export const commandJSON = {
    commonCommands: Object.values(commonCommands).map(commandData => commandData.slashCommand.toJSON()),
    modCommands: Object.values(modCommands).map(commandData => commandData.slashCommand.toJSON()),
};

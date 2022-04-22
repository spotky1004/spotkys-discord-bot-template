import path from "path";
import getPath from "../util/getPath.js";
import readModules from "../util/readModules.js";
const { __dirname } = getPath(import.meta.url);
const commonCommandNameEnum = {
    "connectchannel": 0,
};
const commonCommands = readModules({
    dirname: path.join(__dirname, "common")
});
const modCommandNameEnum = {
    "ban": 0,
    "unban": 1,
};
const modCommands = readModules({
    dirname: path.join(__dirname, "common")
});
export { commonCommands, modCommands };
export const commandJSON = {
    commonCommands: Object.values(commonCommands).map(commandData => commandData.slashCommand.toJSON()),
    modCommands: Object.values(modCommands).map(commandData => commandData.slashCommand.toJSON()),
};
